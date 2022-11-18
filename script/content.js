const openModalAdd = document.querySelector('[data-open-modal]')
const modalsWr = document.querySelector('[data-modal_wr]')

const items = document.querySelector('.items');
// const stor = localStorage.getItem('data')

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
      <div class='info__name-id'>
      <div class='cat__name'>${cat.name}</div>
      <div class='cat__id'>ID №${cat.id}</div>
      </div>
      <div class='cat__age'>Возраст: ${cat.age}</div>
      <div class='cat__rate'>Рейтинг: ${cat.rate}</div>
   </div>
   <div class="edit__container">
      <button data-action='show' class="edit__cat">Подробнее</button>
      <button data-action='delete' class="delete__cat">Удалить</button>
   </div>
  
   </div>
   
`
const generateModalShowCat = (cat) => `
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
               <div class='cat__age'>Возраст: ${cat.id}</div>
                  <div class='cat__rate'>Рейтинг: ${cat.rate}</div>
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




const inputId = document.querySelector('#inputId')
const inputName = document.querySelector('#inputName')
const inputAge = document.querySelector('#inputAge')
const inputRate = document.querySelector('#inputRate')
const inputDescription = document.querySelector('#inputDescription')
const inputLink = document.querySelector('#inputLinkImg')

document.forms.add_cat.addEventListener('submit', (e) => {
   e.preventDefault()

   const data = Object.fromEntries(new FormData(e.target).entries())
   console.log({ data });

   data.id = Number(data.id)
   data.rate = Number(data.rate)
   data.age = Number(data.age)
   data.favorite = data.favorite == 'on'
   // let name = data.nameCat
   // data.name
   // delete data.nameCat  

   // const inputId = document.querySelector('#inputId')
   // const inputName = document.querySelector('#inputName')
   // const inputAge = document.querySelector('#inputAge')
   // const inputRate = document.querySelector('#inputRate')
   // const inputDescription = document.querySelector('#inputDescription')
   // const inputLink = document.querySelector('#inputLinkImg') 


   if (inputLink.value == '') {
      data.img_link = 'https://raw.githubusercontent.com/GuliaKimba/catsimg/main/imgnew/defaultPhotoCat.jpg'
   }

  
 

   let ok;
   api.getAllCats().then((res) => {

      res.data.forEach((e) => {
         if (data.id === e.id) {

            console.log(data.id);
            console.log(e.id);
            inputId.classList.add('stop')
            alert('Такой ID уже существует. Введите другое число!')
            ok = false
            console.log({ ok });
            return
         } 
      })
   })
   console.log({ ok });
   let b;
   if (data.name == '') {
      console.log({inputName});
      alert ('Введите имя')
      b = false
      return
   }
   let c;
   if (data.id == '') {
      console.log({inputName});
      alert ('Введите ID')
      c = false
      return
   }

   api.addCat(data).then(() => {
      if ((ok == false) || (b == false) || (c == false)) {
         return
      }  else {
      console.log({ data });
      items.insertAdjacentHTML('beforeend', generateHTMLForCat(data))
      modalsWr.classList.add('hidden__modal')
      console.log({ modalsWr });
      e.target.reset()
      }
   }).catch(alert)


   // api.addCat(data).then(() => {
   //    console.log({ data });
   //    items.insertAdjacentHTML('beforeend', generateHTMLForCat(data))
   //    modalsWr.classList.add('hidden__modal')
   //    console.log({ modalsWr });
   //    e.target.reset()

   // }).catch(alert)



})//конец формы


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

const closeModalAdd = document.querySelector('.modal__img-add')
closeModalAdd.addEventListener('click', (e) => {
   console.log({ e });
   closeModalWindowAdd(e)
})


items.addEventListener('click', (e) => {

   //show
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


   const cardItem = e.target.closest('[data-id_card]');
   const idCat = cardItem.dataset.id_card


   const modalEditInfoCat = document.querySelector('.edit__info-cat')
   if (e.target.dataset.action == 'edit') {
      const openModalPut = document.querySelector('[data-open-put]')
      const modalPut = document.querySelector('[data-modal_put]')
      const formEdit = document.querySelector('#form__edit')
      const inputEdit = document.querySelectorAll('.input__edit')
      const inputEditAge = document.querySelector('.input__edit-age')
      const inputEditRate = document.querySelector('.input__edit-rate')
      const inputEditDescription = document.querySelector('.input__edit-description')
      const inputEditImgLink = document.querySelector('.input__edit-img_link')
      const inputEditCheck = document.querySelector('.input__edit-check')

      modalPut.classList.remove('hidden__modal')

      generateNewForm(idCat)

      const closeModal = document.querySelector('.modal_img-sava-edit')

      closeModal.addEventListener('click', (e) => {

         closeModalWindowEdit(e)

      })

      document.forms.edit_cat.addEventListener('submit', (e) => {
         e.preventDefault()


         const data = Object.fromEntries(new FormData(e.target).entries())
         let ageVal = inputEditAge.value;
         let rateVal = inputEditRate.value;
         let descriptionVal = inputEditDescription.value;
         let imgLinkVal = inputEditImgLink.value;
         let checkVal = inputEditCheck.value;


         data.rate = Number(data.rate)
         data.age = Number(data.age)
         data.favorite = data.favorite == 'on'


         api.showCat(idCat).then((res) => {
            console.log(res.data.age);
            if (ageVal === '') {
               data.age = res.data.age
            }
            console.log(data.age);
            if (rateVal === '') {
               data.rate = res.data.rate
            }
            if (descriptionVal === '') {
               data.description = res.data.description
            }
            if (imgLinkVal === '') {
               data.img_link = res.data.img_link
            }

            console.log(data);


            api.putCat(data, idCat).then(() => {
               console.log({ data });
            }).catch(alert)

         })


         //конец формы
      })

   }


   function generateNewForm(idCat) {
      cardItem.classList.add('hidden__modal');
   }

   //конец обработчик показать конкретного кота
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
function closeModalWindowAdd(e) {
   if (e.target.classList.contains('.modal__img-1') || e.target.closest('.modal__img-1')) {
      e.target.closest('[data-id_card-1]').classList.add('hidden__modal')
   }
   location.reload()

}
function closeModalWindowEdit(e) {
   if (e.target.classList.contains('.modal__img-add') || e.target.closest('.modal__img-add')) {
      e.target.closest('[data-modal_put]').classList.add('hidden__modal')
   }
   location.reload()

}

function closeModalContainer(e) {
   if ((!e.target.classList.contains('.modal__show')) ) {
      return
   }else {
      const parentEl = document.querySelector('.modal__container')
      
      parentEl.classList.add('hidden__modal')
      
   }
   // location.reload()

}
// deleteCat(delCat)