import axios from 'axios';
const baseurl = 'http://localhost:3000/enterprise';

function CompareObjects(object1: any, object2: any) {
  expect(object1.cnpj).toBe(object2.cnpj);
  expect(object1.name).toBe(object2.name);
  expect(object1.phone).toBe(object2.phone);
  expect(object1.email).toBe(object2.email);
  expect(object1.adressStreet).toBe(object2.adressStreet);
  expect(object1.adressNumber).toBe(object2.adressNumber);
  expect(object1.adressDistrict).toBe(object2.adressDistrict);
  expect(object1.adressCep).toBe(object2.adressCep);
}

it('should post a new enterprise', async () => {
  const validInput = {
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
  const responseData = (await axios.post(baseurl, validInput)).data;
  expect(responseData._id).toBeDefined();
  CompareObjects(responseData, validInput);
});

it('should post and request new enterprise', async () => {
  const validInput = {
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
  const EnterpriseId = (await axios.post(baseurl, validInput)).data._id;
  const enterprise = (await axios.get(baseurl + '/' + EnterpriseId)).data;
  expect(enterprise).toBeDefined();
  CompareObjects(enterprise, validInput);
});

it('should post the validInput and update the database with the newValidInput', async () => {
  const validInput = {
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
  const EnterpriseId = (await axios.post(baseurl, validInput)).data._id;
  const validInput2 = {
    _id: EnterpriseId,
    cnpj: '01916446000123',
    name: 'Empresa valida2',
    phone: '69984696664',
    email: 'EmpresaVAAAlida@gmail.com',
    adressStreet: 'rua dallacosta',
    adressNumber: '0310',
    adressCityId: '',
    adressDistrict: 'centro',
    adressCep: '',
  };
  await axios.put(baseurl + '/' + EnterpriseId, validInput2);
  const enterprise = (await axios.get(baseurl + '/' + EnterpriseId)).data;
  CompareObjects(enterprise, validInput2);
});
