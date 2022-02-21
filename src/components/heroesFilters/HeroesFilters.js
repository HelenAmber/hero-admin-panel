
import {useSelector, useDispatch} from 'react-redux';
import {useHttp} from '../../hooks/http.hook';
import { heroesFetched } from '../../actions';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {heroes, filter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const getFilters = () => {
        request("http://localhost:3001/filters")
          .then(data => console.log(data))
    }

    const heroesFilter = (element) => {
       //console.log(heroes);
    //    let arr = heroes.filter(item => item.element === element);
    //    filter.push();
    //    dispatch(heroesFetched(filter));      
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button  className="btn btn-outline-dark active">Все</button>
                    <button onClick={() => getFilters()} className="btn btn-danger">Огонь</button>
                    <button onClick={() => heroesFilter('water')} className="btn btn-primary">Вода</button>
                    <button onClick={() => heroesFilter('wind')} className="btn btn-success">Ветер</button>
                    <button onClick={() => heroesFilter('earth')} className="btn btn-secondary">Земля</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;