const {Employee} = require('../models')
const jobfiles = ['Taxi Driver', 'Pilot', 'Flight Attendant', 'Co-Pilot']
const states = ['Zimbabwe', 'United Arab Emirates', 'Saudi Arabia','England','California, USA', 'Ohio, USA']

module.exports.displayEmployees = async function (req, res){
    const employees = await Employee.findAll();
    res.render('index', {employees})
}

module.exports.renderAddEmployeeForm = function(req, res){
    res.render('createUserForm',
        {
            employee: {
              firstname:'',
              lastname:'',
              jobfile:jobfiles[0],
              streetline1:'',
              streetline2:'',
              city:'',
              state:states[0],
              zip:'',
              phonenumber:'',
              yearhired:'',
            },
            jobfiles,
            stateslist:states
        });
}

module.exports.addEmployee = async function(req, res){
    await Employee.create(
        {
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            jobfile:req.body.jobfile,
            streetline1:req.body.streetline1,
            streetline2:req.body.streetline2,
            city:req.body.city,
            state:req.body.state,
            zip:req.body.zip,
            phonenumber:req.body.phonenumber,
            yearhired:req.body.yearhired,
        }
    );
    res.redirect('/');
}

module.exports.renderUpdateForm = async function(req, res){
    const employee = await Employee.findByPk( req.params.id);
    res.render('edit', {
        employee,
        jobfiles,
        stateslist:states
    });
}

module.exports.updateEmployee = async function(req, res){
    await Employee.update(
        {
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            jobfile:req.body.jobfile,
            streetline1:req.body.streetline1,
            streetline2:req.body.streetline2,
            city:req.body.city,
            state:req.body.state,
            zip:req.body.zip,
            phonenumber:req.body.phonenumber,
            yearhired:req.body.yearhired,
        },
        {
            where: {
                id:req.params.id
            }
        });
    res.redirect('/');
}

module.exports.deleteEmployee = async function(req, res){
    await Employee.destroy({
        where:{
            id:req.params.id
        }
    });
    res.redirect('/')
}