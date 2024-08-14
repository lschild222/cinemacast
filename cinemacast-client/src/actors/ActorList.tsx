import { useEffect, useState } from "react";
import { Actor } from "./Actor";
import { actorAPI } from "./ActorAPI";

function ActorList() {
  const [actors, setActors] = useState<Actor[]>([]);

  async function loadActors() {
    let data = await actorAPI.list();
    setActors(data);
  }

  useEffect(() => {
    loadActors();
  }, []);

  return (
    <section className="d-flex flex-wrap gap-4">
      {actors.map((actor) => (
        <div className="card">
          <strong>{actor.name}</strong>
        </div>
      ))}
    </section>
  );
}

<<<<<<< HEAD
export default ActorList;
=======
export default ActorList;
>>>>>>> 7ee40cc2994cf9c887fc255f5c706dbe6dbdb235
