export const validate = (name: string, location: string, cuisine: string) => {
  const newErrors: { name?: string; location?: string; cuisine?: string } = {};
  if (!name || !name.trim().length) newErrors.name = 'Name is required';
  if (!location || !location.trim().length)
    newErrors.location = 'Location is required';
  if (!cuisine || !cuisine.trim().length)
    newErrors.cuisine = 'Cuisine is required';
  return newErrors;
};
