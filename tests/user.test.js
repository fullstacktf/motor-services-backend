import { getAPI } from './config';

const api = getAPI('/users');

const newUser = {
    "DNI":12341566,
    "id_rol": 1,
    "password_key": "xdxd",
    "email": "jackshephard69@lost.org",
    "city":"Mozaga",
    "first_name": "Juan",
    "last_name": "Francisco",
    "phone_number":6969696,
    "birth_date": "1983-09-21",
    "profile_image":"Shannon"
}

const getAllUsers = async () => {
  const response = await api.get('/');
  return response.body.users;
};

const createUser = async (user) =>
  await api.post('/').send(user);


describe('Users', () => {
  it('should create a new user', async () => {
    const result = await createUser(newUser);

    expect(result.statusCode).toBe(201);
    expect(result.body).toHaveProperty('result');
    expect(result.body.result).toBe('OK');
  });

  it('should add a single user', async () => {
    const initialUsers = await getAllUsers();

    await createUser(newUser);

    const newUsers = await getAllUsers();
    expect(newUsers).toHaveLength(initialUsers.length + 1);
  });
});
