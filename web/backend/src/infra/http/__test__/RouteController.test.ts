import axios from 'axios';

const routeUrl = 'http://localhost:3000/route';
const enterpriseUrl = 'http://localhost:3000/enterprise';

function compareObject(route: any, object: any) {
  expect(route.description).toBe(object.description);
  expect(route.startTime).toBe(object.startTime);
  expect(route.enterpriseId).toBe(object.enterpriseId);
}

it('should post a new user', async () => {
  const validInputEnterprise = {
    cnpj: '01916446000123',
    name: 'Empresa valida',
    phone: '69984696665',
    email: 'Empresa@gmail.com',
    adressStreet: 'rua vanderlei dallacosta',
    adressNumber: '0310',
    adressCityId: '',
    adressDistrict: 'centro',
    adressCep: '',
  };
  const responseEnterprise = await axios.post(
    enterpriseUrl,
    validInputEnterprise,
  );
  const enterprise = responseEnterprise.data;
  const validInputRoute = {
    startTime: '07:00:00',
    description: 'A valid Description',
    enterpriseId: enterprise._id,
  };
  const responseRoute = await axios.post(routeUrl, validInputRoute);
  const route = responseRoute.data;
  compareObject(route, validInputRoute);
});

it('should post and request new user', async () => {
  const validInputEnterprise = {
    cnpj: '01916446000123',
    name: 'Empresa valida',
    phone: '69984696665',
    email: 'Empresa@gmail.com',
    adressStreet: 'rua vanderlei dallacosta',
    adressNumber: '0310',
    adressCityId: '',
    adressDistrict: 'centro',
    adressCep: '',
  };
  const responseEnterprise = await axios.post(
    enterpriseUrl,
    validInputEnterprise,
  );
  const enterprise = responseEnterprise.data;
  const validInputRoute = {
    startTime: '07:00:00',
    description: 'A valid Description',
    enterpriseId: enterprise._id,
  };
  const responseRoute = await axios.post(routeUrl, validInputRoute);
  const routeId = responseRoute.data._id;
  const getRoute = await axios.get(routeUrl + '/' + routeId);
  compareObject(getRoute, validInputRoute);
});

it('should post the validInput and update the database with the newValidInput', async () => {
  const validInputEnterprise = {
    cnpj: '01916446000123',
    name: 'Empresa valida',
    phone: '69984696665',
    email: 'Empresa@gmail.com',
    adressStreet: 'rua vanderlei dallacosta',
    adressNumber: '0310',
    adressCityId: '',
    adressDistrict: 'centro',
    adressCep: '',
  };
  const responseEnterprise = await axios.post(
    enterpriseUrl,
    validInputEnterprise,
  );
  const enterprise = responseEnterprise.data;
  const validInputRoute1 = {
    startTime: '07:00:00',
    description: 'A valid Description',
    enterpriseId: enterprise._id,
  };
  const responseRoute = await axios.post(routeUrl, validInputRoute1);
  const routeId = responseRoute.data._id;
  const validInputRoute2 = {
    _id: routeId,
    startTime: '08:00:00',
    description: 'Another valid Description',
    enterpriseId: enterprise._id,
  };
  await axios.put(routeId, validInputRoute2);
  const getRoute = await axios.get(routeUrl + '/' + routeId);
  compareObject(getRoute, validInputRoute2);
});
