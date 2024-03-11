import React from "react";
import { useGlobalContext } from "../context";
import MostEffectiveList from "../components/MostEffectiveList";

export default function Home() {
  const { topEffective, employees } = useGlobalContext();
  return (
    <>
      <main className="main-bg">
        <div class="main__section">
          <h1>
            Welcome On
            <span className="text-primary"> smart</span>PLAN manager application
          </h1>
          <p class="lead">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, vel
            doloremque. Assumenda dolores recusandae amet neque ea corrupti
            temporibus nisi laborum rerum dicta, aliquam nesciunt natus,
            voluptas facilis nobis eum, optio exercitationem vel nihil
            aspernatur. Eum mollitia corrupti, aspernatur molestias odio
            pariatur sint distinctio illum iusto reiciendis autem, debitis
            delectus. Veritatis doloremque perspiciatis sed nisi architecto?
            Nisi dolor voluptatem optio numquam laudantium dolorem sapiente
            molestiae tenetur debitis. Doloribus debitis cumque quos, iure
            dolorem dolores illum cum aliquam, animi iusto officia facilis velit
            inventore minus recusandae voluptatem, autem voluptatum
            exercitationem quis. Error suscipit, voluptatem ducimus alias quidem
            voluptate aut placeat eveniet.
          </p>
        </div>
        {topEffective.length > 0 && (
          <article>
            <h2 className="text-align p-top2">
              The most effective{" "}
              {topEffective.length === 1 ? "employee" : "employees"} from last
              month
            </h2>
            <div className="most__effective container">
              <MostEffectiveList
                topEffective={topEffective}
                employees={employees}
              />
            </div>
          </article>
        )}
      </main>
    </>
  );
}
