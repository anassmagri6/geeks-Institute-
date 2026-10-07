function UserFavoriteAnimals (){
return (
<div>
<ul>
 {props.favAnimals.map((animal, index) => (
     <li key={index}>{animal}</li>
    ))}

</ul>

</div>


)

}
export default UserFavoriteAnimals;