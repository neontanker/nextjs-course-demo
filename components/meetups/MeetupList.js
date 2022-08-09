import { useRouter } from "next/router";

import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function MeetupList(props) {
  const router = useRouter();
  const removeMeetupHandler = async (id) => {
    const response = await fetch("/api/remove-meetup", {
      method: "DELETE",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    router.reload();
  };

  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          removeMeetup={removeMeetupHandler}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
