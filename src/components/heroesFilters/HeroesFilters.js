
import {useSelector, useDispatch} from 'react-redux';
import {useHttp} from '../../hooks/http.hook';
import { heroesFiltered, filtresFetched } from '../../actions';
import {useEffect} from 'react';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {heroes, filters} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect (() => {
        request("http://localhost:3001/filters")
          .then(data => dispatch(filtresFetched(data)))
          .catch(error => console.log(error))
          // eslint-disable-next-line
    }, [])

    const heroesFilter = (element) => {
            let arr = heroes.filter(item => item.element === element);
            dispatch(heroesFiltered(arr));            
    }

    const buttonsCreator = (arr) => {
         return arr.map(item => {
            return (
                <button  onClick={() => heroesFilter(item.id)} 
                         className={item.class}
                         id={item.id}>{item.name}</button>
            )
         })        
     }
 
   let buttons = buttonsCreator(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                     {buttons} 
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;