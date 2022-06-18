<?php

namespace App\Entity;

use App\Repository\LangueRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LangueRepository::class)]
class Langue
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $nom;

    #[ORM\OneToMany(mappedBy: 'langue', targetEntity: CompetenceLinguistique::class)]
    private $competencelinguistique;

    public function __construct()
    {
        $this->competencelinguistique = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * @return Collection<int, CompetenceLinguistique>
     */
    public function getCompetencelinguistique(): Collection
    {
        return $this->competencelinguistique;
    }

    public function addCompetencelinguistique(CompetenceLinguistique $competencelinguistique): self
    {
        if (!$this->competencelinguistique->contains($competencelinguistique)) {
            $this->competencelinguistique[] = $competencelinguistique;
            $competencelinguistique->setLangue($this);
        }

        return $this;
    }

    public function removeCompetencelinguistique(CompetenceLinguistique $competencelinguistique): self
    {
        if ($this->competencelinguistique->removeElement($competencelinguistique)) {
            // set the owning side to null (unless already changed)
            if ($competencelinguistique->getLangue() === $this) {
                $competencelinguistique->setLangue(null);
            }
        }

        return $this;
    }
}
