import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import { ICategory } from '../../models/ICategory';
import getToken from '../../shared/getToken';
import DeleteElement from '../deleteElement/deleteElement';
import './adminCategory.scss';

export interface Props {
  category: ICategory;
}

const AdminCategory: React.FC<Props> = ({ category }) => {
  const { updateCategory, deleteCategory, clearToken } = useActions();
  const [editMode, setEditMode] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const deleteHandler = () => {
    if (!getToken()) {
      clearToken();
      return;
    }
    category.cards.forEach((card) => {
      localStorage.removeItem(card._id || '');
    });
    deleteCategory(category._id || '');
  };

  const submitHandler: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (!getToken()) {
      clearToken();
      return;
    }
    category.categoryName = categoryName;
    updateCategory(category._id || '', category);
    setEditMode(false);
  };

  return (
    <div className="admin-category admin__card">
      {editMode ? (
        <form className="categories__form form-categories" onSubmit={submitHandler}>
          <div className="form-categories__input">
            <label className="form-categories__label" htmlFor="category-name">
              Category name
            </label>
            <input
              type="text"
              defaultValue={category.categoryName}
              name="category-name"
              id="category-name"
              placeholder="Enter category name"
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="form-categories__btns">
            <button className="admin__btn btn--blue" type="submit">
              update
            </button>
            <button className="admin__btn btn--red" type="button" onClick={() => setEditMode(false)}>
              cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3 className="admin__title">{category.categoryName}</h3>
          <p className="admin__text">
            Words: <span>{category.cards.length}</span>
          </p>
          <div className="admin-category__btns">
            <button className="admin__btn btn--blue" onClick={() => setEditMode(true)}>
              Update
            </button>
            <NavLink
              to={{ pathname: `${category.categoryName}/words`, state: category }}
              className="admin__btn btn--blue"
            >
              Configure
            </NavLink>
          </div>
          <DeleteElement clickHandler={deleteHandler} />
        </>
      )}
    </div>
  );
};

export default AdminCategory;
