CREATE DATABASE adopet character set='UTF8' collate='UTF8_general_ci';

USE adopet;

CREATE TABLE if not exists tb_user(
cd_user INT NOT NULL AUTO_INCREMENT,
nm_user VARCHAR (60),
cpf_user VARCHAR (50),
cidade_user VARCHAR (50),
email_user VARCHAR (60),
senha_user VARCHAR (180),
sexo_user VARCHAR(80), 
	CONSTRAINT pk_user
		PRIMARY KEY (cd_user))
engine InnoDB;

CREATE TABLE if not exists tb_tutor(
cd_tutor INT NOT NULL AUTO_INCREMENT,
nm_instuicao VARCHAR (60),
cnpj_tutor VARCHAR (50),
cidade_tutor VARCHAR (50),
num_tutor VARCHAR (50),
email_tutor VARCHAR (60),
senha_tutor VARCHAR (180), 
	CONSTRAINT pk_tutor
		PRIMARY KEY (cd_tutor))
engine InnoDB;

CREATE TABLE if not exists tb_pet(
cd_pet INT NOT NULL AUTO_INCREMENT,
nm_pet VARCHAR (60),
sexo_pet VARCHAR(80), 
nasc_pet DATE,
raca_pet VARCHAR (60),
porte_pet VARCHAR (60),
castrado_pet VARCHAR (60),
img_pet VARCHAR (180),
	CONSTRAINT pk_pet
		PRIMARY KEY (cd_pet))
engine InnoDB;