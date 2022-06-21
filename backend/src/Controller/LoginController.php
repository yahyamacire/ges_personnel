<?php

namespace App\Controller;

use App\Entity\Employe;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Persistence\ManagerRegistry;


#[Route('api/')]
class LoginController extends AbstractFOSRestController
{
    #[Route('register', name: 'user_register')]
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher, ManagerRegistry  $doctrine)
    {
        
        $parameters = json_decode($request->getContent(), true);

        
        $username = $parameters['login'];
        $password = $parameters['password'];
        $email = $parameters['email'];
        $langKey = $parameters['langKey'];

        $user = new User();
        $user->setActive(true);
        $user->setEmail($email);
        $user->setUsername($username);

        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $password
        );
        $user->setPassword($hashedPassword);

        $user->setRoles(['ROLE_USER']);

        $em = $doctrine->getManager();

        $em->persist($user);

        // Création Employer

        $employer = new Employe();
        $employer->setNom('');
        $employer->setPrenom('');
        $employer->setNni(0);
        $employer->setSexe('HOMME');
        $employer->setEmail('');
        $employer->setDateNaissance(new \DateTime());
        $employer->setTelephone(0);
        $employer->setFonction('AUTRE');

        $employer->setCompte($user);
        $em->persist($employer);

        $em->flush();

        return new JsonResponse(
            '{"sttaus": "ok"}',
            Response::HTTP_OK,
            ['content-type' => 'application/json']
        );
    }

    public function api()
    {
        return new Response(sprintf('Logged in as %s', $this->getUser()->getUsername()));
    }

    #[Route('account', name: 'user_account')]
    public function getConnectedUser()
    {

        return $this->handleView($this->view($this->getUser()));
    }
}
