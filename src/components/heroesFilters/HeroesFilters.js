
import {useSelector, useDispatch} from 'react-redux';
import {useHttp} from '../../hooks/http.hook';
import { heroesFetched, heroesFiltered, filtresFetched } from '../../actions';
import {useEffect} from 'react';
import HeroesListItem from '../heroesListItem/HeroesListItem'
import { toBeDisabled } from '@testing-library/jest-dom/dist/to-be-disabled';
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

    useEffect (() => {
        request("http://localhost:3001/filters")
          .then(data => console.log(data))
            //dispatch(filtresFetched(data)))
          .catch(error => console.log(error))
          // eslint-disable-next-line
    }, [])

    const heroesFilter = (element) => {
            let arr = heroes.filter(item => item.element === element);
            if(arr.length === 0){
                return ;
            }
            dispatch(heroesFiltered(arr));            
    }

    

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button  onClick={() => heroesFilter('all')} className="btn btn-outline-dark active">Все</button>
                    <button onClick={() => heroesFilter('fire')} className="btn btn-danger">Огонь</button>
                    <button onClick={() => heroesFilter('water')} className="btn btn-primary">Вода</button>
                    <button onClick={() => heroesFilter('wind')} className="btn btn-success">Ветер</button>
                    <button onClick={() => heroesFilter('earth')} className="btn btn-secondary">Земля</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;