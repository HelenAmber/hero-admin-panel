import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useHttp} from '../../hooks/http.hook';
import {useDispatch} from 'react-redux';
import { heroAdded } from '../../actions';
import { v4 as uuidv4 } from 'uuid';
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    const newHeroId = uuidv4();

    const newHeroCreating = (values) => {        
        const newHero = {
            id: newHeroId, 
            name: values.name, 
            description: values.description, 
            element: values.element
        }

       request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(newHero))
        .then(dispatch(heroAdded(newHero)))
        .catch(error => console.log(error))
    }

    return (
        <Formik
            initialValues = {{
                    name:'',
                    description:'',
                    element:''
                }}
                validation = {Yup.object({
                    name: Yup.string()
                            .min(2, 'Введите не менее двух символов')
                            .required('Поле обязательно для заполнения'),
                    description: Yup.string()
                            .min(2, 'Введите не менее двух символов')
                            .required('Поле обязательно для заполнения'),
                    element: Yup.string()
                            .required('Поле обязательно для заполнения'),
                    }) 
                }
                onSubmit = {(values) => newHeroCreating(values)}>

        <Form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <Field 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>
           <ErrorMessage name="name" component="div"/>
            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <Field
                    required
                    name="description" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>
            <ErrorMessage name="description" component="div"/>
            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <Field 
                    as="select"
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </Field>
            </div>
            <ErrorMessage name="element" component="div"/>
            <button type="submit" 
                    className="btn btn-primary"
                    >Создать</button>
        </Form>
     </Formik>
    )
}

export default HeroesAddForm;