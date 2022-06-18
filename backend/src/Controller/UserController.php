<?php

namespace App\Controller;

use App\Entity\Authority;
use App\Entity\User;
use App\Repository\AuthorityRepository;
use App\Repository\UserRepository;
use Doctrine\Persistence\ManagerRegistry;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/')]
class UserController extends AbstractFOSRestController
{
    #[Rest\Get('admin/users', name: 'api_get_users')]
    public function users(UserRepository $userRepository)
    {
        $list = $userRepository->findAll();
        return $this->handleView($this->view($list));
    }

    #[Rest\Get('admin/users/{username}', name: 'api_get_user')]
    public function user(User $user)
    {
        return $this->handleView($this->view($user));
    }


    #[Rest\Post('admin/users', name: 'api_create_user')]
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher, ManagerRegistry $doctrine)
    {

        $em = $doctrine->getManager();

        $data = json_decode($request->getContent(), true);

        $username = $data['login'];
        $firstName = $data['firstName'];
        $lastName = $data['lastName'];
        $email = $data['email'];
        $activated = $data['activated'];
        $langKey = $data['langKey'];
        $authorities = $data['authorities'];

        $user = new User();

        $user->setActive($activated);
        $user->setEmail($email);
        $user->setUsername($username);
        $user->setFirstname($firstName);
        $user->setLastname($lastName);
        $user->setLangKey($langKey);
        $user->setRoles($authorities);

        $password = '123456';

        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $password
        );
        $user->setPassword($hashedPassword);

        $connectedUser = $this->getUser();

        $user->setCreatedBy($connectedUser->getUsername());
        $user->setCreatedDate(new \DateTime());
        $em->persist($user);
        $em->flush();

        return new JsonResponse(
            '{"success": "user created"}',
            Response::HTTP_OK,
            ['content-type' => 'application/json']
        );

    }

    #[Rest\Put('admin/users', name: 'api_edit_user')]
    public function update(Request $request, UserRepository $repository, ManagerRegistry $doctrine)
    {

        $em = $doctrine->getManager();

        $data = json_decode($request->getContent(), true);

        $id = $data['id'];
        $firstName = $data['firstName'];
        $lastName = $data['lastName'];
        $email = $data['email'];
        $activated = $data['activated'];
        $langKey = $data['langKey'];
        $authorities = $data['authorities'];

        $user = $repository->find($id);
        if ($user == null) {
            throw new NotFoundHttpException();
        }

        $user->setActive($activated);
        $user->setEmail($email);
        $user->setFirstname($firstName);
        $user->setLastname($lastName);
        $user->setLangKey($langKey);
        $user->setRoles($authorities);

        $connectedUser = $this->getUser();

        $user->setLastModifiedBy($connectedUser->getUsername());
        $user->setLastModifiedDate(new \DateTime());
        $em->persist($user);
        $em->flush();

        return new JsonResponse(
            '{"success": "user created"}',
            Response::HTTP_OK,
            ['content-type' => 'application/json']
        );

    }


    #[Rest\Post('account/change-password', name: 'api_user_change_pass')]
    public function change(Request $request, UserPasswordEncoderInterface $encoder)
    {
        $em = $this->getDoctrine()->getManager();
        $repository = $this->getDoctrine()->getRepository(User::class);

        $data = json_decode($request->getContent(), true);

        $currentPassword = $data['currentPassword'];
        $newPassword = $data['newPassword'];

        $user = $this->getUser();

        if ($user == null) {
            throw new NotFoundHttpException();
        }

        $hash = $encoder->encodePassword($user, $currentPassword);


        if ($encoder->isPasswordValid($user, $currentPassword)) {
            $newHash = $encoder->encodePassword($user, $newPassword);
            $user->setPassword($newHash);
        } else {
            throw new NotFoundHttpException();
        }

        $em->persist($user);
        $em->flush();

        return new JsonResponse(
            '{"success": "user created"}',
            Response::HTTP_OK,
            ['content-type' => 'application/json']
        );

    }


    #[Rest\Get('authorities', name: 'api_authorities')]
    public function authorities(AuthorityRepository $repository)
    {
        $data = $repository->findAll();
        $authorities = [];
        foreach ($data as $authority) {
            $authorities[] = $authority->getName();
        }
        return $this->handleView($this->view($authorities));
    }


    #[Rest\Delete('admin/users/{username}', name: 'api_delete_user')]
    public function delete(User $user)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($user);
        $em->flush();
        return new JsonResponse(
            '{"success": "user deleted"}',
            Response::HTTP_OK,
            ['content-type' => 'application/json']
        );
    }
}


