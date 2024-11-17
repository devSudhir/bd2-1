const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

const person = {
  firstName: 'Sudhir',
  lastName: 'Samantaray',
  gender: 'male',
  age: 28,
  isMember: true,
};

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get('/person', (req, res) => {
  res.json(person);
});

function getFullName(person) {
  return { fullName: `${person.firstName} ${person.lastName}` };
}

app.get('/person/fullname', (req, res) => {
  res.json(getFullName());
});

app.get('/person/firstname-gender', (req, res) => {
  res.json({
    firstName: person.firstName,
    gender: person.gender,
  });
});

app.get('/person/increment-age', (req, res) => {
  //const updatedPerson = { ...person, age: person.age + 1 };
  person.age = person.age + 1;
  console.log(person);
  res.json(person);
});

app.get('/person/fullname-membership', (req, res) => {
  res.json({
    ...getFullName(person),
    isMember: person.isMember,
  });
});

app.get('/person/final-price', (req, res) => {
  const { cartTotal } = req.query;
  if (person.isMember) {
    res.json({
      finalPrice: parseFloat(cartTotal) - parseFloat(cartTotal) * 0.1,
    });
  } else {
    res.json({ finalPrice: cartTotal });
  }
});

app.get('/person/shipping-cost', (req, res) => {
  const { cartTotal } = req.query;
  if (person.isMember && parseFloat(cartTotal) > 500) {
    res.json({
      shippingCost: 0,
    });
  } else {
    res.json({ shippingCost: 99 });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
