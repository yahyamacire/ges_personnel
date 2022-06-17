<?php

namespace App\Entity;

use App\Repository\CompetenceLinguistiqueRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CompetenceLinguistiqueRepository::class)]
class CompetenceLinguistique
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $niveau;

    #[ORM\ManyToOne(targetEntity: Employe::class, inversedBy: 'competenceLinguistique')]
    private $employe;

    #[ORM\ManyToOne(targetEntity: Langue::class, inversedBy: 'competencelinguistique')]
    private $langue;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNiveau(): ?string
    {
        return $this->niveau;
    }

    public function setNiveau(string $niveau): self
    {
        $this->niveau = $niveau;

        return $this;
    }

    public function getEmploye(): ?Employe
    {
        return $this->employe;
    }

    public function setEmploye(?Employe $employe): self
    {
        $this->employe = $employe;

        return $this;
    }

    public function getLangue(): ?Langue
    {
        return $this->langue;
    }

    public function setLangue(?Langue $langue): self
    {
        $this->langue = $langue;

        return $this;
    }
}
