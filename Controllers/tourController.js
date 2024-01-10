const Tour = require('./../Models/tourModels')

exports.getAllTours = async(req,res)=>{
    try{
        const tours = await Tour.find().select('-_id -__v')
        res.status(200).json({
            status: 'success',
            count : tours.length,
            tours
        })
    }catch(err){
        res.status(404).json({
            status : 'fail',
            message: err
        })
    }
}

exports.getOneTour = async(req,res)=>{
    try{
        console.log(req.params)
        const id = req.params.id
        const tour = await Tour.findById(id)

        res.status(200).json({
            status: 'success',
            tour
        })
    }catch(err){
        res.status(404).json({
            status : 'fail',
            message: err
        })
    }
}

exports.updateTour = async(req,res)=>{
    try{
        const data = req.body
        const id = req.params.id
        const tour = await Tour.findByIdAndUpdate(id, data, {new: true, runValidators: true})

        res.status(200).json({
            status: 'success',
            message: 'updated successfully',
            tour
        })
    }catch(err){
        res.status(404).json({
            status : 'fail',
            message: err
        })
    }
}

exports.createTour = async(req,res)=>{
    try{
        const tour = await Tour.create(req.body)
        tour.__v = undefined
        res.status(201).json({
            status: 'success',
            message: 'created successfully',
            tour
        })
    }catch(err){
        res.status(404).json({
            status : 'fail',
            message: err
        })
    }
}

exports.deleteTour = async(req,res)=>{
    try{
        const id = req.params.id
        const tour = await Tour.findByIdAndDelete(id);
        res.status(200).json({
            status: 'success',
            message: 'deleted successfully'
        })
    }catch(err){
        res.status(404).json({
            status : 'fail',
            message: err
        })
    }
}

