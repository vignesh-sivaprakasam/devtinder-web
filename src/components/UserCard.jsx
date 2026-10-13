export const UserCard = ({ user }) => {
  const { firstName, lastName, age, about, photoUrl, gender, _id } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="w-full h-1/2">
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <div className="h-full">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <span>{age + ", " + gender}</span>}
          <div>{about}</div>
        </div>
        <div className="card-actions justify-center ">
          <button className="btn btn-secondary">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};
