import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {
  Restaurant,
  calculatePagination,
  deleteRestaurant,
  setCurrentPage,
} from '../redux/restaurantSlice';
import { useNavigate } from 'react-router-dom';
import AddRestaurant from '../components/AddRestaurant';
import ConfirmationModal from '../components/ConfirmationModal';
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  ActionButton,
} from '../components/Table';
import styled from '@emotion/styled';

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PaginationButton = styled.button`
  padding: 10px 20px;
  margin: 0 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

const Styled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const RestaurantList: React.FC = () => {
  //   const restaurants = useSelector(
  //     (state: RootState) => state.restaurants.restaurants
  //   );

  const { paginatedRestaurants, currentPage, totalPages, restaurants } =
    useSelector((state: RootState) => state.restaurants);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    string | null
  >(null);

  const handleEdit = (id: string) => {
    navigate(`/restaurants/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setSelectedRestaurantId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRestaurantId) {
      dispatch(deleteRestaurant(selectedRestaurantId));
      setSelectedRestaurantId(null);
      setIsModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setSelectedRestaurantId(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(calculatePagination());
  }, [dispatch, currentPage, restaurants]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <Styled>
      <h1>Foodie Delight </h1>
      <AddRestaurant />
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Location</TableHeader>
            <TableHeader>Cuisine</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {paginatedRestaurants.map((restaurant: Restaurant) => (
            <TableRow key={restaurant.id}>
              <TableCell>{restaurant.name}</TableCell>
              <TableCell>{restaurant.location}</TableCell>
              <TableCell>{restaurant.cuisine}</TableCell>
              <TableCell>
                <ActionButton onClick={() => handleEdit(restaurant.id)}>
                  Edit
                </ActionButton>
                <ActionButton onClick={() => handleDelete(restaurant.id)}>
                  Delete
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <PaginationControls>
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
      </PaginationControls>
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </Styled>
  );
};

export default RestaurantList;
{
  /* 
/*import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { calculatePagination, setCurrentPage } from '../redux/restaurantSlice';
import { useHistory } from 'react-router-dom';
import AddRestaurant from '../components/AddRestaurant';
import ConfirmationModal from '../components/ConfirmationModal';
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  ActionButton,
} from '../components/Table';
import styled from '@emotion/styled';

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PaginationButton = styled.button`
  padding: 10px 20px;
  margin: 0 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

const RestaurantList: React.FC = () => {
  const { paginatedRestaurants, currentPage, totalPages } = useSelector(
    (state: RootState) => state.restaurants
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(calculatePagination());
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleEdit = (id: string) => {
    history.push(`/restaurants/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    // Handle delete logic
  };

  return (
    <div>
      <h1>Restaurants</h1>
      <AddRestaurant />
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Location</TableHeader>
            <TableHeader>Cuisine</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {paginatedRestaurants.map((restaurant) => (
            <TableRow key={restaurant.id}>
              <TableCell>{restaurant.name}</TableCell>
              <TableCell>{restaurant.location}</TableCell>
              <TableCell>{restaurant.cuisine}</TableCell>
              <TableCell>
                <ActionButton onClick={() => handleEdit(restaurant.id)}>
                  Edit
                </ActionButton>
                <ActionButton onClick={() => handleDelete(restaurant.id)}>
                  Delete
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <PaginationControls>
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
      </PaginationControls>
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default RestaurantList; */
}
