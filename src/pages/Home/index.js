import Menu from "../../containers/Menu";
import ServiceCard from "../../components/ServiceCard";
import EventCard from "../../components/EventCard";
import PeopleCard from "../../components/PeopleCard";

import "./style.scss";
import EventList from "../../containers/Events";
import Slider from "../../containers/Slider";
import Logo from "../../components/Logo";
import Icon from "../../components/Icon";
import Form from "../../containers/Form";
import Modal from "../../containers/Modal";
import { useData } from "../../contexts/DataContext";

const Page = () => {
  const { data } = useData();

  // Récupérer le dernier événement (le plus récent)
  const last = data?.events
    ? [...data.events].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
    : null;

  return (
    <>
      <header>
        <Menu />
      </header>
      <main>
        <section className="SliderContainer">
          <Slider />
        </section>
        <section className="ServicesContainer">
          <h2 className="Title">Nos services</h2>
          <p>Nous organisons des événements sur mesure partout dans le monde</p>
          <div className="ListContainer">
            <ServiceCard imageSrc="/images/priscilla-du-preez-Q7wGvnbuwj0-unsplash1.png">
              <h3>Soirée d&apos;entreprise</h3>
              Une soirée d&apos;entreprise vous permet de réunir vos équipes pour un
              moment convivial afin de valoriser votre société en projetant une
              image dynamique. Nous vous proposons d&apos;organiser pour vous vos
              dîners et soirées d&apos;entreprise.
            </ServiceCard>
            <ServiceCard imageSrc="/images/hall-expo.png">
              <h3>Conférences</h3>
              724 events vous propose d&apos;organiser votre événement, quelle que soit
              sa taille, en s&apos;adaptant à vos demandes. En tant que spécialistes de
              l&apos;événementiel, nous saurons trouver le lieu parfait ainsi que des
              solutions inédites pour capter votre audience et faire de cet événement un succès.
            </ServiceCard>
            <ServiceCard imageSrc="/images/sophia-sideri-LFXMtUuAKK8-unsplash1.png">
              <h3>Expérience digitale</h3>
              Notre agence experte en contenus immersifs offre des services de
              conseil aux entreprises, pour l&apos;utilisation de la réalité virtuelle,
              de la réalité augmentée et de la réalité mixte, de l&apos;animation
              événementielle à la veille technologique jusqu&apos;au développement de
              modules de formation innovants.
            </ServiceCard>
          </div>
        </section>
        <section className="EventsContainer">
          <h2 className="Title">Nos réalisations</h2>
          <EventList />
        </section>
        <section className="PeoplesContainer">
          <h2 className="Title">Notre équipe</h2>
          <p>Une équipe d&apos;experts dédiés à l&apos;organisation de vos événements</p>
          <div className="ListContainer">
            {[
              { name: "Samira", position: "CEO", image: "/images/stephanie-liverani-Zz5LQe-VSMY-unsplash.png" },
              { name: "Jean-baptiste", position: "Directeur marketing", image: "/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.png" },
              { name: "Alice", position: "CXO", image: "/images/christina-wocintechchat-com-SJvDxw0azqw-unsplash.png" },
              { name: "Luís", position: "Animateur", image: "/images/jonas-kakaroto-KIPqvvTOC1s-unsplash.png" },
              { name: "Christine", position: "VP animation", image: "/images/amy-hirschi-b3AYk8HKCl0-unsplash1.png" },
              { name: "Isabelle", position: "VP communication", image: "/images/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.png" },
            ].map((person) => (
              <PeopleCard
                key={person.name}
                imageSrc={person.image}
                name={person.name}
                position={person.position}
              />
            ))}
          </div>
        </section>
        <div className="FormContainer" id="contact">
          <h2 className="Title">Contact</h2>
          <Modal
            Content={
              <div className="ModalMessage--success">
                <div>Message envoyé !</div>
                <p>
                  Merci pour votre message, nous tâcherons de vous répondre dans
                  les plus brefs délais.
                </p>
              </div>
            }
          >
            {({ setIsOpened }) => (
              <Form onSuccess={() => setIsOpened(true)} onError={() => null} />
            )}
          </Modal>
        </div>
      </main>
      <footer className="row">
        <div className="col presta">
          <h3>Notre dernière prestation</h3>
          {last ? (
            <EventCard
              imageSrc={last.cover}
              title={last.title}
              date={new Date(last.date)}
              small
              label={last.type || "Événement"}
            />
          ) : (
            <p>Aucune prestation disponible.</p>
          )}
        </div>
        <div className="col contact">
          <h3>Contactez-nous</h3>
          <address>45 avenue de la République, 75000 Paris</address>
          <div>01 23 45 67 89</div>
          <div>contact@724events.com</div>
          <div>
            {["twitch", "facebook", "twitter", "youtube"].map((platform) => (
              <a key={platform} href={`#${platform}`}>
                <Icon name={platform} />
              </a>
            ))}
          </div>
        </div>
        <div className="col description">
          <Logo size="large" />
          Une agence événementielle propose des prestations spécialisées dans la conception et l&apos;organisation d&apos;événements.
        </div>
      </footer>
    </>
  );
};

export default Page;
