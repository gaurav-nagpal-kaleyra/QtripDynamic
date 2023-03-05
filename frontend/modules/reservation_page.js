import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const url = config.backendEndpoint + "/reservations/";
  try {
    const result = await fetch(url)
      .then((res) => res.json())
      .then((response) => {
        return response;
      });
    return result;
  } catch (err) {
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length == 0) {
    let noReservationBanner = document.getElementById('no-reservation-banner');
    let reservationTableParent = document.getElementById('reservation-table-parent');

    noReservationBanner.style.display = "block";
    reservationTableParent.style.display = "none";
  
  } else {
    let noReservationBanner = document.getElementById('no-reservation-banner');
    let reservationTableParent = document.getElementById('reservation-table-parent');

    noReservationBanner.style.display = "none";
    reservationTableParent.style.display = "block";

    let resTable = document.getElementById("reservation-table");

    for (let i = 0; i < reservations.length; i++) {
      let tr = document.createElement("tr");
      let transaction = document.createElement("td");

      transaction.innerHTML = reservations[i].id;
      tr.appendChild(transaction);

      let bookingName = document.createElement("td");

      bookingName.innerHTML = reservations[i].name;
      tr.appendChild(bookingName);

      let adventure = document.createElement("td");

      adventure.innerHTML = reservations[i].adventureName;
      tr.appendChild(adventure);

      let person = document.createElement("td");

      person.innerHTML = reservations[i].person;
      tr.appendChild(person);

      let date = document.createElement("td");
      let newDate = new Date(reservations[i].date);
      newDate = newDate.toLocaleDateString("en-IN");
      date.innerHTML = newDate;

      tr.appendChild(date);

      let price = document.createElement("td");

      price.innerHTML = reservations[i].price;
      tr.appendChild(price);

      let booking = document.createElement("td");

      let newBooking = new Date(reservations[i].time);
      let day = newBooking.getDate();
      let month = newBooking.toLocaleString("default", { month: "long" });
      let year = newBooking.getFullYear();

      let time = newBooking.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second : "numeric",
        hour12: true,
      });

      let toAppendDate = day + " " + month + " " + year + ", " + time.toLocaleLowerCase();
      booking.innerHTML = toAppendDate;
      tr.appendChild(booking);

      let td = document.createElement("td");
      let a = document.createElement("a");
      a.innerText = "Visit Adventure";
      a.classList.add("reservation-visit-button");
      a.href = `http://65.0.201.129:8081/workspace/gaurav-nagpal-kaleyra-ME_QTRIPDYNAMIC/frontend/pages/adventures/detail/?adventure=${reservations[i].adventure}`;
      td.setAttribute("id", reservations[i].id);
      td.appendChild(a);
      tr.appendChild(td);

      resTable.appendChild(tr);
    }
  console.log(document.getElementById(reservations[0].id).children[0].href);
  }
   /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
