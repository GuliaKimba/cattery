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


const generateHTMLForCat = function (cat) {
   if (cat.favourite == true) {
      return `
<div data-id_card='${cat.id}' class='item'>
   <div class="item__img">
      <img src="${cat.img_link}" alt="">
   </div>
   <div class='info__cat'>
      <div class='info__name-id'>
      <div class='cat__name'>${cat.name}</div>
      <div class='cat__id'>ID №${cat.id}</div>
      </div>
      <div class='cat__age'>Возраст: ${cat.age}</div>
      <div class='cat__rate'>Рейтинг: ${cat.rate}</div>
      <div data-action='favourite' class='cat__favorite favorite__container cat__favorite-like'></div> 
   </div>
   <div class="edit__container">
      <button data-action='show' class="edit__cat">Подробнее</button>
      <button data-action='delete' class="delete__cat">Удалить</button>
   </div>
   </div>
`
   } else {
      return `
   <div data-id_card='${cat.id}' class='item'>
      <div class="item__img">
         <img src="${cat.img_link}" alt="">
      </div>
      <div class='info__cat'>
         <div class='info__name-id'>
         <div class='cat__name'>${cat.name}</div>
         <div class='cat__id'>ID №${cat.id}</div>
         </div>
         <div class='cat__age'>Возраст: ${cat.age}</div>
         <div class='cat__rate'>Рейтинг: ${cat.rate}</div>
         <div data-action='unfavourite' class='cat__favorite favorite__container'>
         <div class='cat__favorite-unlike'></div> 
         </div>
      </div>
      <div class="edit__container">
         <button data-action='show' class="edit__cat">Подробнее</button>
         <button data-action='delete' class="delete__cat">Удалить</button>
      </div>
      </div>
   `
   }
}


const generateModalShowCat = function (cat) {
   if (cat.favourite == true) {
      return `
<div data-id_card='${cat.id}' class='modal__container'> 
   <div class='modal__show'>
      <div class="item__img">
         <img src="${cat.img_link}" alt="${cat.name}">
      </div>
      <div class='modal__description'>
         <div class='show__info-cat'>
         <div class='info__name-id'>
            <div class='cat__name'>${cat.name}</div>
            <div class='cat__id'>id ${cat.id}</div>
            </div>
               <div class='pharam'>   
               <div class='cat__age'>Возраст: ${cat.age}</div>
                  <div class='cat__rate'>Рейтинг: ${cat.rate}</div>
                  </div>
                  <div class='cat__favorite favorite__container'>
                  <div class='cat__favorite-like'></div> 
               </div>
         <div class='cat__description'>${cat.description}</div>
      </div>
      <div class="edit__container">
         <button data-open-put data-action='edit' class="edit__info-cat edit__cat">Редактировать</button>
         <button data-action='delete' class="delete__cat">Удалить</button>
      </div>
      </div>
      <div data-close-modal class='modal__img'></div>
      </div>
</div>
`
   } else {
      return `
      <div data-id_card='${cat.id}' class='modal__container'> 
         <div class='modal__show'>
            <div class="item__img">
               <img src="${cat.img_link}" alt="${cat.name}">
            </div>
            <div class='modal__description'>
               <div class='show__info-cat'>
               <div class='info__name-id'>
                  <div class='cat__name'>${cat.name}</div>
                  <div class='cat__id'>id ${cat.id}</div>
                  </div>
                     <div class='pharam'>   
                     <div class='cat__age'>Возраст: ${cat.age}</div>
                        <div class='cat__rate'>Рейтинг: ${cat.rate}</div>
                        </div>
                        <div class='cat__favorite favorite__container'>
                        <div class='cat__favorite-unlike'></div> 
                     </div>
               <div class='cat__description'>${cat.description}</div>
            </div>
            <div class="edit__container">
               <button data-open-put data-action='edit' class="edit__info-cat edit__cat">Редактировать</button>
               <button data-action='delete' class="delete__cat">Удалить</button>
            </div>
            </div>
            <div data-close-modal class='modal__img'></div>
      </div>
      `
   }
}


const api = new Api('https://sb-cats.herokuapp.com/api/2/guliakimba');

api.getAllCats().then((res) => res.data.forEach((cat) => items.insertAdjacentHTML('beforeend', generateHTMLForCat(cat))))


items.addEventListener('click', (e) => {
   switch (e.target.dataset.action) {
      case 'delete': {
         const cardItem = e.target.closest('[data-id_card]');
         const idCat = cardItem.dataset.id_card

         api.deleteCat(idCat).then(() => {
            cardItem.remove()
         })

         break
      }

      default:
         break
   }

})


const inputId = document.querySelector('#inputId')
const inputName = document.querySelector('#inputName')
const inputAge = document.querySelector('#inputAge')
const inputRate = document.querySelector('#inputRate')
const inputDescription = document.querySelector('#inputDescription')
const inputLink = document.querySelector('#inputLinkImg')

document.forms.add_cat.addEventListener('submit', (e) => {
   e.preventDefault()

   const data = Object.fromEntries(new FormData(e.target).entries())

   data.id = Number(data.id)
   data.rate = Number(data.rate)
   data.age = Number(data.age)
   data.favourite = data.favourite == 'on'

   if (inputLink.value == '') {
      data.img_link = 'https://raw.githubusercontent.com/GuliaKimba/catsimg/main/imgnew/defaultPhotoCat.jpg'
   }

   let validateId;
   api.getAllCats().then((res) => {

      res.data.forEach((e) => {
         if (data.id === e.id) {

            alert('Такой ID уже существует. Введите другое число!')
            validateId = false

            return
         }
      })
   })

   let validateIdLength;
   if (data.id == '') {

      alert('Введите ID')
      validateIdLength = false
      return
   }

   let validateName;
   if ((data.name == '') || (!isNaN(data.name))) {

      alert('Введите имя буквами')
      validateName = false
      return
   }

   if (data.rate < 1 || data.rate > 10) {
      alert('Рейтинг может быть от 1 до 10')
      return
   }

   api.addCat(data).then(() => {
      if ((validateId == false) || (validateName == false) || (validateIdLength == false)) {
         return
      } else {

         items.insertAdjacentHTML('beforeend', generateHTMLForCat(data))
         modalsWr.classList.add('hidden__modal')

         e.target.reset()
      }
   }).catch(alert)

})

document.querySelector('.modal__container').addEventListener('click', (e) => {
   closeModalWindowAdd(e)
})

document.forms.add_cat.addEventListener('input', (e) => {
   const formDataCat = Object.fromEntries(new FormData(document.forms.add_cat).entries());
   const dataSetLS = localStorage.setItem(document.forms.add_cat.name, JSON.stringify(formDataCat))
})

const dataGetLS = localStorage.getItem(document.forms.add_cat.name)
const dataGetObjLS = dataGetLS ? JSON.parse(dataGetLS) : undefined

if (dataGetObjLS) {
   Object.keys(dataGetObjLS).forEach(k => {
      document.forms.add_cat[k].value = dataGetObjLS[k]
   })
}


items.addEventListener('click', (e) => {

   switch (e.target.dataset.action) {
      case 'show': {
         const cardItem = e.target.closest('[data-id_card]');
         const idCat = cardItem.dataset.id_card

         // let a;
         api.showCat(idCat).then((res) => {

            items.insertAdjacentHTML('beforeend', generateModalShowCat(res.data))

            const closeModalCntShowCat = document.querySelector('.modal__container')
            closeModalCntShowCat.addEventListener('click', (e) => {
               closeModalContainer(e)
            })

         })

         break;
      }
      default:
         break
   }

   closeModalWindow(e)

   const cardItem = e.target.closest('[data-id_card]');

   if (e.target.dataset.action == 'edit') {

      
      const idCat = cardItem.dataset.id_card
      // const modalEditInfoCat = document.querySelector('.edit__info-cat')

      // const openModalPut = document.querySelector('[data-open-put]')
      const modalPut = document.querySelector('[data-modal_put]')
      // const formEdit = document.querySelector('#form__edit')
      // const inputEdit = document.querySelectorAll('.input__edit')
      const inputEditName = document.querySelector('.input__edit-name')
      const inputEditAge = document.querySelector('.input__edit-age')
      const inputEditRate = document.querySelector('.input__edit-rate')
      const inputEditDescription = document.querySelector('.input__edit-description')
      const inputEditImgLink = document.querySelector('.input__edit-img_link')
      const inputEditCheck = document.querySelector('#inputCheck1')


      modalPut.classList.remove('hidden__modal')

      generateNewForm(idCat)


      const closeModal = document.querySelector('.modal_img-save-edit')

      closeModal.addEventListener('click', (e) => {
         closeModalWindowEdit(e)
      })


      document.forms.edit_cat.addEventListener('submit', (e) => {
         e.preventDefault()

         const data = Object.fromEntries(new FormData(e.target).entries())

         let nameVal = inputEditName.value
         let ageVal = inputEditAge.value;
         let rateVal = inputEditRate.value;
         let descriptionVal = inputEditDescription.value;
         let imgLinkVal = inputEditImgLink.value;
         let checkVal = inputEditCheck;


         data.rate = Number(data.rate)
         data.age = Number(data.age)
         data.favourite = data.favourite == 'on'


         if (checkVal.checked) {
            data.favourite == true
         } else {
            data.favourite == false
         }


         api.showCat(idCat).then((res) => {

            if (nameVal === '') {
               data.name = res.data.name
            }

            if (ageVal === '') {
               data.age = res.data.age
            }

            if (rateVal === '') {
               data.rate = res.data.rate
            } else if (rateVal < 1 || rateVal > 10) {
               alert('Рейтинг может быть от 1 до 10')
               return
            }
           
            if (descriptionVal === '') {
               data.description = res.data.description
            }
           
            if (imgLinkVal === '') {
               data.img_link = res.data.img_link
            }

            api.putCat(data, idCat).then().catch(alert)

         })

         // closeModalWindowAdd(e)

      })

   }


   function generateNewForm(idCat) {
      cardItem.classList.add('hidden__modal');
   }

})


openModalAdd.addEventListener('click', () => {
   modalsWr.classList.remove('hidden__modal')
})


function closeModalWindow(e) {
   if (e.target.classList.contains('.modal__img') || e.target.closest('.modal__img')) {

      e.target.closest('.modal__container').classList.add('hidden__modal')
   }
}
function closeModalWindowAdd(e) {
   if (e.target.classList.contains('.modal__img-add') || e.target.closest('.modal__img-add')) {

      e.target.closest('.modal__container').classList.add('hidden__modal')
   }


}
function closeModalWindowEdit(e) {
   if (e.target.classList.contains('.modal__img-add') || e.target.closest('.modal__img-add')) {
      
      e.target.closest('[data-modal_put]').classList.add('hidden__modal')
   }

}

function closeModalContainer(e) {
   if ((!e.target.classList.contains('.modal__show'))) {
      return
   } else {
      const parentEl = document.querySelector('.modal__container')

      parentEl.classList.add('hidden__modal')

   }

}
