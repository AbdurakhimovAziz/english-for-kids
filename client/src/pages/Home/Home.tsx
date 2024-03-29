import * as React from 'react';
import { NavLink } from 'react-router-dom';
import useTypeSelector from '../../hooks/useTypeSelector';
import { CARDS_URL } from '../../shared/constants';
import noImage from '../../assets/no-image.png';
import './home.scss';
import Loader from '../../components/loader/loader';

const Home: React.FC = () => {
  const { cardCategories, loading } = useTypeSelector((state) => state.categories);
  const { isPlayMode } = useTypeSelector((state) => state.global);

  if (loading) return <Loader />;

  return (
    <div className={`categories cards__row ${isPlayMode ? 'play-mode' : ''}`}>
      {cardCategories.map((category, index) => (
        <NavLink className="categories__card card" to={{ pathname: CARDS_URL, state: category.cards }} key={index}>
          <div className="categories__card-img">
            <img src={`${category.cards[0] ? category.cards[0].image : noImage}`} />
          </div>
          <div className="categories__card-title">{category.categoryName}</div>
        </NavLink>
      ))}
    </div>
  );
};

export default Home;
