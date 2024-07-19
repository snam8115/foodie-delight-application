// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import { updateRestaurant, Restaurant } from '../redux/restaurantSlice';
// import { RootState } from '../redux/store';
// import styled from '@emotion/styled';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const Input = styled.input`
//   margin: 10px;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// const EditRestaurant: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const restaurant = useSelector((state: RootState) =>
//     state.restaurants.restaurants.find((r) => r.id === id)
//   );

//   const [name, setName] = useState('');
//   const [location, setLocation] = useState('');
//   const [cuisine, setCuisine] = useState('');

//   useEffect(() => {
//     if (restaurant) {
//       setName(restaurant.name);
//       setLocation(restaurant.location);
//       setCuisine(restaurant.cuisine);
//     }
//   }, [restaurant]);

//   const handleUpdateRestaurant = () => {
//     if (restaurant) {
//       const updatedRestaurant = {
//         ...restaurant,
//         name,
//         location,
//         cuisine,
//       };
//       dispatch(updateRestaurant(updatedRestaurant));
//       navigate('/restaurants');
//     }
//   };

//   return (
//     <Container>
//       <h2>Edit Restaurant</h2>
//       <Input
//         type='text'
//         placeholder='Name'
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <Input
//         type='text'
//         placeholder='Location'
//         value={location}
//         onChange={(e) => setLocation(e.target.value)}
//       />
//       <Input
//         type='text'
//         placeholder='Cuisine'
//         value={cuisine}
//         onChange={(e) => setCuisine(e.target.value)}
//       />
//       <Button onClick={handleUpdateRestaurant}>Update Restaurant</Button>
//     </Container>
//   );
// };

// export default EditRestaurant;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addRestaurant,
  Restaurant,
  updateRestaurant,
} from '../redux/restaurantSlice';
import styled from '@emotion/styled';
import { RootState } from '../redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import { validate } from '../utils/utils';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 20px auto;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 15px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const EditRestaurant: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [cuisine, setCuisine] = useState<string>('');
  const [errors, setErrors] = useState<{
    name?: string;
    location?: string;
    cuisine?: string;
  }>({});

  const restaurant = useSelector((state: RootState) =>
    state.restaurants.restaurants.find((r) => r.id === id)
  );

  // const [name, setName] = useState('');
  // const [location, setLocation] = useState('');
  // const [cuisine, setCuisine] = useState('');

  useEffect(() => {
    if (restaurant) {
      setName(restaurant.name);
      setLocation(restaurant.location);
      setCuisine(restaurant.cuisine);
    }
  }, [restaurant]);

  const handleUpdateRestaurant = () => {
    if (restaurant) {
      const updatedRestaurant = {
        ...restaurant,
        name,
        location,
        cuisine,
      };
      dispatch(updateRestaurant(updatedRestaurant));
      navigate('/restaurants');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(name, location, cuisine);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      handleUpdateRestaurant();
      setName('');
      setLocation('');
      setCuisine('');
      setErrors({});
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor='name'>Name:</Label>
      <Input
        id='name'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

      <Label htmlFor='location'>Location:</Label>
      <Input
        id='location'
        type='text'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      {errors.location && <ErrorMessage>{errors.location}</ErrorMessage>}

      <Label htmlFor='cuisine'>Cuisine:</Label>
      <Input
        id='cuisine'
        type='text'
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
      />
      {errors.cuisine && <ErrorMessage>{errors.cuisine}</ErrorMessage>}

      <Button type='submit'>Update Restaurant</Button>
    </Form>
  );
};

export default EditRestaurant;
