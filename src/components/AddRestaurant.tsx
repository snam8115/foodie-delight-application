import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRestaurant, Restaurant } from '../redux/restaurantSlice';
import styled from '@emotion/styled';
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

const AddRestaurant: React.FC = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    location?: string;
    cuisine?: string;
  }>({});
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(name, location, cuisine);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const newRestaurant: Restaurant = {
        id: Date.now().toString(),
        name,
        location,
        cuisine,
      };
      dispatch(addRestaurant(newRestaurant));
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

      <Button type='submit'>Add Restaurant</Button>
    </Form>
  );
};

export default AddRestaurant;
