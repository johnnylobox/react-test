import React, { Component } from "react";
import CoursesApi from "../../bd/courses";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            courses: CoursesApi.courses,
            course_name: '',
            course_schedule: [],
            single_course: {
                id: '',
                name: '',
                days: [
                    {
                        name: '',
                    }
                ],
            },

            index_general: '',

            /*----- Form Data ----------------*/
            name_course: '',
            course_days: [],
            /*----- End Form Data -------------*/

            days:[
                {
                    name: 'Monday',
                    alias: 'Lunes',
                },
                {
                    name: 'Tuesday',
                    alias: 'Martes',
                },
                {
                    name: 'Wednesday',
                    alias: 'Miércoles'
                },
                {
                    name: 'Thursday',
                    alias: 'Jueves'
                },
                {
                    name: 'Friday',
                    alias: 'Viernes'
                },
                {
                    name: 'Saturday',
                    alias: 'Sabado',
                },
            ],
            ejemplo : [],
        }

        this.modalUpdateClose = this.modalUpdateClose.bind(this);
        this.modal_close = this.modal_close.bind(this);
        this.courseNameMutation = this.courseNameMutation.bind(this);
        this.courseDaysMutation = this.courseDaysMutation.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
        this.modal_new = this.modal_new.bind(this);
        this.modal_new_close = this.modal_new_close.bind(this);

        this.name_form = this.name_form.bind(this);
        this.days_form = this.days_form.bind(this);
        this.newCourse = this.newCourse.bind(this);

    }

    name_form(e){
        e.preventDefault();
        this.setState({
            name_course: e.target.value,
        });
        // console.log(this.state.name_course);
    }

    days_form(e){
        e.preventDefault();
        var options = e.target.options;
        var value = [];
        for(var i = 0; i < options.length; i++){
            if(options[i].selected) {
                value.push({name : options[i].value});
            }else{
                value.splice(i, 1);
            }
        }
        this.setState({
            course_days: value
        })
        // console.log(this.state.course_days);
    }

    newCourse(e){
        e.preventDefault();
        const notification = new Notyf();
        const params = {
            id: (this.state.courses.length+1),
            name: this.state.name_course,
            days: this.state.course_days,
        }

        var query_courses = this.state.courses;
        query_courses.push(params);
        this.setState({
            courses: query_courses,
        });
        notification.success('<b>'+ this.state.name_course + '</b> ha sido agregado a la lista de cursos de manera exitosa');
        window.$('#modalNew').hide();
        this.setState({
            name_course: '',
            course_days: [],
        });
    
        // console.log(params);
        // console.log(this.state.courses);
    }

    modal_info(e){
        if(e === undefined){
            return false;
        }else{
            this.state.course_name = this.state.courses[e].name;
            this.setState({
                course_schedule: this.state.courses[e].days,
            });
            window.$("#modal").toggle('show');
        }
        // console.log(this.state.course_schedule);
    }

    courseNameMutation(e){
        e.preventDefault();
        this.setState({
            single_course:{
                id: this.state.single_course.id,
                name: e.target.value,
                days: this.state.single_course.days,
            }
        });
        // console.log(this.state.single_course.name);
    }

    courseDaysMutation(e){
        e.preventDefault();
        var options = e.target.options;
        var value = [];
        for(var i = 0; i < options.length; i++){
            if(options[i].selected) {
                value.push({name : options[i].value});
            }else{
                value.splice(i, 1);
            }
        }
        this.setState({
            single_course:{
                id: this.state.single_course.id,
                name: this.state.single_course.name,
                days:value
            } 
        })
    }

    modal_new(e){
        window.$("#modalNew").toggle('show');
    }

    modal_new_close(e){
        window.$("#modalNew").toggle('hide');
    }

    modal_update(index){
        if(index === undefined){
            return false;
        }else{
            this.state.course_name = this.state.courses[index].name;
            this.state.single_course = this.state.courses[index];
            this.state.index_general = index;
            this.setState({
                single_course: this.state.courses[index],
                index_general: index,
            });
            // console.log(this.state.single_course);
            // console.log(this.state.index_general);
            window.$("#modalUpdate").toggle('show');
        }
    }

    submitUpdate(e){
        e.preventDefault();
        const params = {
            id: this.state.single_course.id,
            name: this.state.single_course.name,
            days: this.state.single_course.days,
        }

        const notification = new Notyf();
        this.state.courses.splice(this.state.index_general, 1, params);
        this.setState({courses: this.state.courses});
        notification.success('Curso Actualizado');
        window.$("#modalUpdate").toggle('hide');
        // console.log(params);
        // console.log(this.state.index_general);
    }

    drop_course(index){
        const confirm = window.confirm('¿Estás seguro de eliminar el curso seleccionado?');
        if(confirm){
            const notification = new Notyf();
            var course_loop = this.state.courses;
            course_loop.splice(index, 1);
            this.setState({courses: course_loop});
            notification.success('Curso eliminado');
        }
    }

    modal_close(e){
        e.preventDefault();
        window.$('#modal').toggle('hide');
    }

    modalUpdateClose(e){
        e.preventDefault();
        window.$('#modalUpdate').toggle('hide');
    }

    componentDidMount = () =>{
        // console.log(this.state.courses);

    }

    render(){
    
        return(
	        <div>
                <div className="container">
                    <div style={{marginTop:'20px'}}>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6">
                                    <h1>Lista de Cursos</h1>
                                </div>
                                <div className="col-md-6">
                                    <button style={{float:'right'}} className="btn btn-primary" onClick={this.modal_new}>
                                        Nuevo Curso <i className="fa fa-plus"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12" style={{marginTop:'15px'}}>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{textAlign:'center'}}>#</th>
                                        <th scope="col" style={{textAlign:'center'}}>Curso</th>
                                        <th scope="col" style={{textAlign:'center'}}>Dias</th>
                                        <th scope="col" style={{textAlign:'center'}}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.courses.map((prop, i) => {
                                            return  <tr key={i}>
                                                        <td scope="row" style={{textAlign:'center'}}>{i+1}</td>
                                                        <td style={{textAlign:'center'}}>{prop.name}</td>
                                                        <td style={{textAlign:'center'}}>
                                                            <button className="btn btn-primary" type="button" value={i} onClick={() => this.modal_info(i)}>
                                                                Ver Horarios
                                                                <i className="fa fa-search" style={{marginLeft:'10px'}}/>
                                                            </button>
                                                        </td>
                                                        <td style={{textAlign:'center'}}>
                                                            <button className="btn btn-info" type="button" value={i} onClick={() => this.modal_update(i)}>
                                                                <i className="fa fa-edit"/>
                                                            </button>
                                                            <button className="btn btn-danger" type="button" value={i} onClick={() => this.drop_course(i)} style={{marginLeft:'10px'}}>
                                                                <i className="fa fa-trash"/>
                                                            </button>
                                                        </td>
                                                    </tr>
                                            }
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="modal" id="modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Horarios de {this.state.course_name}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.modal_close}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ul>
                                    {
                                        this.state.course_schedule.map((key, i) => {
                                            return <li key={i}>{ key.name }</li>
                                            }
                                        )
                                    }
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="#modal" onClick={this.modal_close}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal" id="modalUpdate">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{backgroundColor:'#f1f1f1'}}>
                            <div className="modal-header">
                                <h5 className="modal-title">{this.state.course_name}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.modalUpdateClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.submitUpdate}>
                                    <fieldset>
                                        <div className="form-group">
                                            <label>Curso: *</label>
                                            <input type="text" className="form-control" placeholder="Nombre del curso" value={this.state.single_course.name} onChange={this.courseNameMutation} required/>
                                        </div>
                                        <div className="form-group">
                                            <label>Dias:</label>
                                            <select className="form-control" multiple="multiple" onChange={this.courseDaysMutation} size={7} required>
                                                {
                                                    this.state.days.map((key, i) =>{
                                                        return <option key={i} value={key.name}> {key.alias} </option>
                                                        
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <button style={{float:'right'}} type="submit" className="btn btn-primary">Aceptar</button>
                                        <button style={{float:'right', marginRight:'10px'}} type="button" className="btn btn-secondary" onClick={this.modalUpdateClose}>Cerrar</button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal" id="modalNew">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{backgroundColor:'#f1f1f1'}}>
                            <div className="modal-header">
                                <h5 className="modal-title">Nuevo Curso</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.modal_new_close}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.newCourse}>
                                    <fieldset>
                                        <div className="form-group">
                                            <label>Curso: *</label>
                                            <input type="text" className="form-control" placeholder="Nombre del curso" value={this.state.name_course} onChange={this.name_form} required/>
                                        </div>
                                        <div className="form-group">
                                            <label>Dias:</label>
                                            <select className="form-control" multiple="multiple" size={7} onChange={this.days_form} required>
                                                {
                                                    this.state.days.map((key, i) =>{
                                                        return <option key={i} value={key.name}> {key.alias} </option>
                                                        
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <button style={{float:'right'}} type="submit" className="btn btn-primary">Aceptar</button>
                                        <button style={{float:'right', marginRight:'10px'}} type="button" className="btn btn-secondary" onClick={this.modal_new_close}>Cerrar</button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
  }

export default Home;
