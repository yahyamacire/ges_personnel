<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220615170949 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE diplome_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE employe_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE experience_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE structure_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE authority (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE diplome (id INT NOT NULL, employe_id INT DEFAULT NULL, libelle VARCHAR(255) NOT NULL, universite VARCHAR(255) NOT NULL, date DATE NOT NULL, description VARCHAR(255) NOT NULL, diplome BYTEA DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_EB4C4D4E1B65292 ON diplome (employe_id)');
        $this->addSql('CREATE TABLE division (id INT NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE employe (id INT NOT NULL, nni INT NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) NOT NULL, sexe VARCHAR(255) NOT NULL, date_naissance DATE NOT NULL, email VARCHAR(255) NOT NULL, telephone INT NOT NULL, date_recrutement DATE DEFAULT NULL, matricule VARCHAR(255) DEFAULT NULL, fonction VARCHAR(255) NOT NULL, adresse VARCHAR(255) DEFAULT NULL, status VARCHAR(255) DEFAULT NULL, domaine VARCHAR(255) DEFAULT NULL, photo BYTEA DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE experience (id INT NOT NULL, entreprise VARCHAR(255) NOT NULL, date_debut DATE NOT NULL, datefin DATE DEFAULT NULL, description VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE projet (id INT NOT NULL, nom VARCHAR(255) NOT NULL, date_debut DATE NOT NULL, date_fin DATE DEFAULT NULL, description TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE structure (id INT NOT NULL, nom VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(255) DEFAULT NULL, active BOOLEAN DEFAULT NULL, firstname VARCHAR(255) DEFAULT NULL, lastname VARCHAR(255) DEFAULT NULL, lang_key VARCHAR(30) DEFAULT NULL, image_url VARCHAR(255) DEFAULT NULL, activation_key VARCHAR(255) DEFAULT NULL, reset_key VARCHAR(255) DEFAULT NULL, reset_date VARCHAR(255) DEFAULT NULL, create_date TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, created_by VARCHAR(255) DEFAULT NULL, last_modified_by VARCHAR(255) DEFAULT NULL, last_modified_date TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649F85E0677 ON "user" (username)');
        $this->addSql('ALTER TABLE diplome ADD CONSTRAINT FK_EB4C4D4E1B65292 FOREIGN KEY (employe_id) REFERENCES employe (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE diplome DROP CONSTRAINT FK_EB4C4D4E1B65292');
        $this->addSql('DROP SEQUENCE diplome_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE employe_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE experience_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE structure_id_seq CASCADE');
        $this->addSql('DROP TABLE authority');
        $this->addSql('DROP TABLE diplome');
        $this->addSql('DROP TABLE division');
        $this->addSql('DROP TABLE employe');
        $this->addSql('DROP TABLE experience');
        $this->addSql('DROP TABLE projet');
        $this->addSql('DROP TABLE structure');
        $this->addSql('DROP TABLE "user"');
    }
}
