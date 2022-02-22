
import {useSelector, useDispatch} from 'react-redux';
import {useHttp} from '../../hooks/http.hook';
import {useEffect} from 'react';
import { filtersFetching, filtresFetched, filtersFetchingError, activeFilterChanged } from '../../actions';
import Spinner from '../spinner/Spinner';
import classNames from 'classnames';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect (() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
          .then(data => dispatch(filtresFetched(data)))
          .catch(error => dispatch(filtersFetchingError()))
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