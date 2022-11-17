const openModalAdd = document.querySelector('[data-open-modal]')
const modalsWr = document.querySelector('[data-modal_wr]')


const items = document.querySelector('.items');

class Api {
   constructor(url) {
      this.url = url
   }

   async getAllCats() {
      try {
         const res = await fetch(`${this.url}/show`)
         return res.json()
      } catch (err) {
         throw Error(err)
      }
   }

   async deleteCat(idCat) {
      try {
         const res = await fetch(`${this.url}/delete/${idCat}`, {
            method: 'DELETE',
         })
         if (res.status != 200) {
            throw Error()
         }

      } catch (err) {
         throw Error(err)
      }
   }

   async addCat(data) {
      try {
         const res = await fetch(`${this.url}/add`, {
            method: 'POST',
            headers: {
               'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
         })
         if (res.status != 200) {
            throw Error()
         }

      } catch (err) {
         throw Error(err)
      }
   }

   async showCat(idCat) {
      try {
         const res = await fetch(`${this.url}/show/${idCat}`)
         return res.json()
      } catch (err) {
         throw Error(err)
      }
   }

   async putCat(data, idCat) {
      try {
         const res = await fetch(`${this.url}/update/${idCat}`, {
            method: 'PUT',
            headers: {
               'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
         })
         if (res.status != 200) {
            throw Error()
         }

      } catch (err) {
         throw Error(err)
      }
   }

}


const generateHTMLForCat = (cat) => `
<div data-id_card='${cat.id}' class='item'>
   <div class="item__img">
      <img src="${cat.img_link}" alt="">
   </div>
   <div class='info__cat'>
      <div class='cat__name'>${cat.name}</div>
      <div class='cat__id'>Номер в базе ${cat.id}</div>
      <div class='cat__rate'>${cat.rate}</div>
   </div>
   <div class="edit__container">
      <button data-action='show' class="edit__cat">Подробнее</button>
      <button data-action='delete' class="delete__cat">Удалить</button>
   </div>
   
`
const generateModalShowCat = (cat) => `
<div data-id_card='${cat.id}' class='modal__container'>
   <div class='modal__show'>
      <div class="item__img">
         <img src="${cat.img_link}" alt="">
      </div>
      <div class='modal__description'>
         <div class='show__info-cat'>
            <div class='cat__name'>${cat.name}</div>
               <div class='pharam'>   
                  <div class='cat__id'>ID ${cat.id}</div>
                  <div class='cat__rate'>Рейтинг ${cat.rate}</div>
               </div>
         <div class='cat__description'>${cat.description}</div>
      </div>
      <div class="edit__container">
         <button data-open-put data-action='edit' class="edit__info-cat">Редактировать</button>
         <button data-action='delete' class="delete__cat">Удалить</button>
      </div>
      </div>
      <div data-close-modal class='modal__img'></div>
</div>
`

const api = new Api('http://sb-cats.herokuapp.com/api/2/guliakimba');
api.getAllCats().then((res) => res.data.forEach(cat => items.insertAdjacentHTML('beforeend', generateHTMLForCat(cat))))



items.addEventListener('click', (e) => {

   switch (e.target.dataset.action) {
      case 'delete': {
         const cardItem = e.target.closest('[data-id_card]');
         const idCat = cardItem.dataset.id_card
         api.deleteCat(idCat).then(() => {
            cardItem.remove()
            location.reload();
         })

         break
      }
      default:
         break
   }
})




document.forms.add_cat.addEventListener('submit', (e) => {
   e.preventDefault()

   const data = Object.fromEntries(new FormData(e.target).entries())
   console.log(data);
   data.id = Number(data.id)
   data.rate = Number(data.rate)
   data.age = Number(data.age)
   data.favorite = data.favorite == 'on'

   api.addCat(data).then(() => {

      items.insertAdjacentHTML('beforeend', generateHTMLForCat(data))
      modalsWr.classList.add('hidden__modal')
      e.target.reset()
   }).catch(alert)
})


items.addEventListener('click', (e) => {

   switch (e.target.dataset.action) {
      case 'show': {
         const cardItem = e.target.closest('[data-id_card]');
         const idCat = cardItem.dataset.id_card

         let a;
         api.showCat(idCat).then((res) => {
            // console.log(res);

            items.insertAdjacentHTML('beforeend', generateModalShowCat(res.data))

            const closeModal = document.querySelector('[data-close-modal]')

            closeModal.addEventListener('click', (e) => {

               closeModalWindow(e)

            })

         })

         break;
      }
      default:
         break
   }

   const cardItem = e.target.closest('[data-id_card]');
   const idCat = cardItem.dataset.id_card
   
   const modalEditInfoCat = document.querySelector('.edit__info-cat')
   if (e.target.dataset.action == 'edit') {
      const openModalPut = document.querySelector('[data-open-put]')
      console.log({ openModalPut });
      const modalPut = document.querySelector('[data-modal_put]')
      console.log(modalPut);

      modalPut.classList.remove('hidden__modal')

      console.log('kkk');
      generateNewForm(idCat)
      console.log({idCat});
      // const myForm = document.querySelector('form [name=add_cat]')
      // const data = new FormData(myForm)

      // console.log({ data });
      document.forms.edit_cat.addEventListener('submit', (e) => {
         e.preventDefault()
         console.log('oooo');

         const data = Object.fromEntries(new FormData(e.target).entries())
         
         
         data.rate = Number(data.rate)
         data.age = Number(data.age)
         data.favorite = data.favorite == 'on'
         console.log(data);
        
         api.putCat(data, idCat).then(() => {
            
            // items.insertAdjacentHTML('beforeend', generateHTMLForCat(data))
            // modalsWr.classList.add('hidden__modal')
            // e.target.reset()
         }).catch(alert)
      
      })
      // api.putCat(idCat).then((res) => {
      //    console.log(res.data);
      // })
   }

   function generateNewForm(idCat) {
      cardItem.classList.add('hidden__modal');

   }


   // if (modalEditInfoCat) {

   //       generateNewForm (idCat)

   // }

})





openModalAdd.addEventListener('click', () => {
   modalsWr.classList.remove('hidden__modal')
})



function closeModalWindow(e) {
   if (e.target.classList.contains('.modal__img') || e.target.closest('.modal__img')) {
      e.target.closest('[data-id_card]').classList.add('hidden__modal')
   }
   location.reload()

}
// deleteCat(delCat)