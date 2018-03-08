var webdriver = require ('selenium-webdriver'),
    By=webdriver.By,
    until=webdriver.until;
    Keys=webdriver.Key;
    wait=webdriver.wait;

var driver = new webdriver.Builder().forBrowser('chrome').build();



async function login_by_avdsh() {
    await driver.sleep(5000)

    number = driver.findElement(By.xpath('//input[@ng-model="vm.login"]'));
    button1= driver.findElement(By.xpath('//button[@ng-click="vm.auth(vm.login,vm.password)"]'));
    pass = driver.findElement(By.xpath('//input[@ng-model="vm.password"]'));

    await pass.sendKeys('12345678')
        .then(() => {
            number.sendKeys('89277039041')
                .then(() => {
                driver.sleep(1000)
                    .then(()=> {
                        button1.click();
                    })
            })

        })
}

async function open_task_by_curator(id) {
     task  = driver.findElement(By.xpath('//input[@id="task_id"]'));
     await task.sendKeys(id)
     //    .then (()=>{console.log(2);})
     await task.sendKeys(Keys.ENTER)
     console.log("open task by cur")
}

function add_coment(){
    comment_place = driver.findElement(By.xpath('//textarea [@ng-model="vm.commentText"]'));
    comment_place.sendKeys('ТЕстовый комент');
    console.log("Add comment");
    add_coment_button = driver.findElement(By.xpath('//button[@ng-click="vm.sendComment(vm.taskId,vm.commentText)"]')).click();
}

function login_by_LN () {
    driver.get("https://develop.wowworks.ru/site/hack-login?id=20781&hash=11f2365950119362500e06af693e380b")
        .then (() => {
            console.log("Вход под еленой");
        })
}

async function wait_element (xpath) {
    driver.wait(until.elementLocated(By.xpath(xpath)), 20000)
}

//Резалт на слипах 23.015
//Промежуточный вариант без пары слипов 16.747
async function add_Work(name) {
    await driver.wait( until.elementLocated(By.xpath('//button [@ng-click="vm.addWork()"]')), 20000);
    //const buttonAddWork = driver.wait( until.elementLocated(By.xpath('//button [@ng-click="vm.addWork()"]')), 20000);
    buttonAddWork = driver.findElement(By.xpath('//button [@ng-click="vm.addWork()"]'))
    await buttonAddWork.sendKeys(Keys.DOWN)
    await driver.sleep(700)
    await buttonAddWork.click()
    await wait_element('//input[@ng-change="vm.onChangeText(vm.ngModel)"]')
    find_area = driver.findElement(By.xpath('//input[@ng-change="vm.onChangeText(vm.ngModel)"]'))
    await find_area.sendKeys(name)
    await driver.sleep(2000)
    await wait_element('//div[@class="popup_search__item_td ng-binding"]');

    first_work = driver.findElement(By.xpath('//div[@class="popup_search__item_td ng-binding"]'))

    await first_work.click()
    await wait_element('//button[@ng-click="vm.closeAndAddService(vm.selectedService)"]')
    addButton = driver.findElement(By.xpath('//button[@ng-click="vm.closeAndAddService(vm.selectedService)"]'))
    addButton.click()
}


//#############____ТЕСТ_____КЕЙСЫ____############
const test_case_1 = async () => {
    const start = Date.now()
    await driver.sleep (1000)
    await login_by_avdsh()
    await driver.sleep (4000)
    // await wait_element('//input[@ng-model="task_id"]')
    await open_task_by_curator(122856)
    await add_Work("Замена")
    console.log((Date.now() - start)/1000)

}

const test_case_3 = async () => {
    const start = Date.now()
    await driver.sleep (1000)
    await login_by_avdsh()
}


driver.get('https://curator.develop.wowworks.ru/auth/login');

test_case_1()






