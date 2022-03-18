CREATE TABLE cakes (
	id SERIAL PRIMARY KEY,
	name varchar(255) NOT NULL UNIQUE,
	price numeric(255) NOT NULL,
	image varchar(255) NOT NULL,
	description TEXT
);

CREATE TABLE clients (
	id SERIAL PRIMARY KEY,
	name varchar(255) NOT NULL,
	addres varchar(255) NOT NULL,
	phone varchar(11) NOT NULL
);

CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	"clientId" INTEGER NOT NULL REFERENCES clients(id),
	"cakeId" INTEGER NOT NULL REFERENCES cakes(id),
	quantity INTEGER  NOT NULL,
	createdAt DATE NOT NULL,
	totalPrice numeric NOT NULL
);