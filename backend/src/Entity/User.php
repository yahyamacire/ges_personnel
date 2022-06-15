<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use JMS\Serializer\Annotation as Serializer;


#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    private $username;

    #[ORM\Column(type: 'json')]
    #[Serializer\SerializedName("authorities")]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    #[Serializer\Exclude()]
    private $password;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $email;

    #[ORM\Column(type: 'boolean', nullable: true)]
    private $active;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Serializer\SerializedName("firstName")]
    private $firstname;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Serializer\SerializedName("lastName")]
    private $lastname;

    #[ORM\Column(type: 'string', length: 30, nullable: true)]
    #[Serializer\SerializedName("langKey")]
    private $langKey;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Serializer\SerializedName("imageUrl")]
    private $imageUrl;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Serializer\Exclude()]
    private $activationKey;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Serializer\Exclude()]
    private $resetKey;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Serializer\Exclude()]
    private $resetDate;

    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Serializer\SerializedName("createDate")]
    private $createDate;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Serializer\SerializedName("createdBy")]
    private $createdBy;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Serializer\SerializedName("lastModifiedBy")]
    private $lastModifiedBy;

    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Serializer\SerializedName("lastModifiedDate")]
    private $lastModifiedDate;

    public function __construct()
    {
        $this->active = false;
    }
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->username;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(?bool $active): self
    {
        $this->active = $active;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(?string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(?string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getLangKey(): ?string
    {
        return $this->langKey;
    }

    public function setLangKey(?string $langKey): self
    {
        $this->langKey = $langKey;

        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->imageUrl;
    }

    public function setImageUrl(?string $imageUrl): self
    {
        $this->imageUrl = $imageUrl;

        return $this;
    }

    public function getActivationKey(): ?string
    {
        return $this->activationKey;
    }

    public function setActivationKey(?string $activationKey): self
    {
        $this->activationKey = $activationKey;

        return $this;
    }

    public function getResetKey(): ?string
    {
        return $this->resetKey;
    }

    public function setResetKey(?string $resetKey): self
    {
        $this->resetKey = $resetKey;

        return $this;
    }

    public function getResetDate(): ?string
    {
        return $this->resetDate;
    }

    public function setResetDate(?string $resetDate): self
    {
        $this->resetDate = $resetDate;

        return $this;
    }

    public function getCreateDate(): ?\DateTimeInterface
    {
        return $this->createDate;
    }

    public function setCreateDate(?\DateTimeInterface $createDate): self
    {
        $this->createDate = $createDate;

        return $this;
    }

    public function getCreatedBy(): ?string
    {
        return $this->createdBy;
    }

    public function setCreatedBy(?string $createdBy): self
    {
        $this->createdBy = $createdBy;

        return $this;
    }

    public function getLastModifiedBy(): ?string
    {
        return $this->lastModifiedBy;
    }

    public function setLastModifiedBy(?string $lastModifiedBy): self
    {
        $this->lastModifiedBy = $lastModifiedBy;

        return $this;
    }

    public function getLastModifiedDate(): ?\DateTimeInterface
    {
        return $this->lastModifiedDate;
    }

    public function setLastModifiedDate(?\DateTimeInterface $lastModifiedDate): self
    {
        $this->lastModifiedDate = $lastModifiedDate;

        return $this;
    }
}
