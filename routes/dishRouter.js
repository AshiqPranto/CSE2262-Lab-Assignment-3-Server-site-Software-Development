const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
const dishes = require('../models/dishes');
const leadersRouter = require('./leadersRouter');
const Leaders = require('../models/leaders');

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get((req,res,next) => {
    dishes.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes);
    },(err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    dishes.create(req.body)
    .then((dishes) => {
        res.statusCode = 200;
        res.json(dishes);
    },(err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    dishes.remove({})
    .then((resp) => {
        res.json(resp);
    })
});

dishRouter.route('/:dishId')
.get((req, res, next) => {
    dishes.findById(req.params.dishId)
    .then((dish) => {
        res.json(dish);
    },(err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' + req.params.dishId);
})
.put((req, res, next) => {
    dishes.findByIdAndUpdate(req.params.dishId,{$set: req.body})
    .then((dishes) => {
        res.json(dishes);
    },(err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.json(resp);
    },(err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:dishId/comments')
.get((req,res,next) => {
    dishes.findById(req.params.dishId)
    .then((dishes) => {
        res.json(dishes.comments);
    })
})
.post((req,res,next) => {
    console.log('post method catched');
    dishes.findById(req.params.dishId)
    .then((dish) => {
        console.log(dish);
        dish.comments.push(req.body);
        dish.save()
        .then((dish) => {
            res.json(dish);
        },(err) => next(err))
        .catch((err) => next(err));
    },(err) => next(err))
    .catch( (err) => next(err));
})
.put((req,res,next) => {
    console.log('put method catched');
    res.end('put operations not supported');
})
.delete((req,res,next) => {
    dishes.findById(req.params.dishId)
    .then((dish) => {
        for(var i = (dish.comments.length -1);i>=0;i--)
        {
            dish.comments[i].remove();
        }
        dish.save()
        .then((dish) => {
            res.json(dish);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});
dishRouter.route('/:dishId/comments/:commentId')
.get((req,res,next) => {
    dishes.findById(req.params.dishId)
    .then((dish) => {
        // console.log(dish.comments.id(req.params.commentId));
        res.json(dish.comments.id(req.params.commentId));
    })
    .catch((err) => next(err));
})
.post((req,res,next) => {
    res.end('post operations not supported');
})
.put((req,res,next) => {
    dishes.findById(req.params.dishId)
    .then((dish) => {
        dish.comments.id(req.params.commentId).comment = req.body.comment;
        dish.comments.id(req.params.commentId).rating = req.body.rating;
        dish.save()
        .then((dish) => {
            res.json(dish);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
})
.delete((req,res,next) => {
    dishes.findById(req.params.dishId)
    .then((dish) => {
        dish.comments.id(req.params.commentId).remove();
        dish.save()
        .then((dish) => {
            res.json(dish);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});


module.exports = dishRouter;