import axios from 'axios';
const baseurl = 'http://localhost:3000/bus';

it('should post a new user', async () => {
  const validInput = {
    description: 'valid description',
    capacity: 39,
  };
  const responseData = (await axios.post(baseurl, validInput)).data;
  expect(responseData._id).toBeDefined();
  expect(responseData.description).toBe(validInput.description);
  expect(responseData.capacity).toBe(validInput.capacity);
});

it('should post and request new user', async () => {
  const validInput = {
    description: 'valid description',
    capacity: 39,
  };
  const userId = (await axios.post(baseurl, validInput)).data._id;
  const user = (await axios.get(baseurl + '/' + userId)).data;
  expect(user).toBeDefined();
  expect(user.description).toBe(validInput.description);
  expect(user.capacity).toBe(validInput.capacity);
});

it('should post the validInput and update the database with the newValidInput', async () => {
  const validInput = {
    description: 'valid description',
    capacity: 39,
  };
  const userId = (await axios.post(baseurl, validInput)).data._id;
  const validInput2 = {
    _id: userId,
    description: 'another valid description',
    capacity: 39,
  };
  await axios.put(baseurl + '/' + userId, validInput2);
  const user = (await axios.get(baseurl + '/' + userId)).data;
  expect(user.description).toBe(validInput2.description);
  expect(user.capacity).toBe(validInput2.capacity);
});
