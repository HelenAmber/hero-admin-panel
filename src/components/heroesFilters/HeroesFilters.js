
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {activeFilterChanged, fetchFilters, selectAll } from './heroesFiltersSlice';
import Spinner from '../spinner/Spinner';
import classNames from 'classnames';
import store from '../../store';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => { 
    const dispatch = useDispatch();  
    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());       

    useEffect (() => {
        dispatch(fetchFilters());
          // eslint-disable-next-line
    }, [])

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const buttonsCreator = (arr) => {
        
         return arr.map(item => {
            const btnClass = classNames( item.class, {
                'active': item.id === activeFilter
            });
            return (
                <button  onClick={() => dispatch(activeFilterChanged(item.id))} 
                         className={btnClass}
                         key={item.id}
                         id={item.id}>
                             {item.name}
                </button>
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