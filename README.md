# VK Covers: Анимированные обложки ВКонтакте
Расширение Гугл, которое позволяет ставить анимированные обложки ВКонтакте, а так же видеть анимированные обложки других пользователей.
Для раскодированя QR-кода используется [zxing-js/library](https://github.com/zxing-js/library). Для кодирования в QR-код используется [EasyQRCodeJS](https://www.npmjs.com/package/easyqrcodejs).

![image](https://user-images.githubusercontent.com/61160742/197359121-4affd0aa-6054-4cad-8f58-5a1b1f82c052.png)

## Установка
1. Загрузите файл расширения `extension.crx` из раздела "Релизы" в этом репозитории.
2. Откройте список установленных расширений в вашем браузере (например, для Яндекса: `browser://tune/`).
3. Перетащите скачанный файл в список расширений и установите его.
   
   **Примечание:** Если вы планируете установить расширение в Google Chrome, необходимо выполнить дополнительные шаги, описанные в разделе "Поддержка в разработке". Также вы можете распаковать файл .crx, разархивировать его и выполнить последний пункт из раздела "Поддержка в разработке".

## Использование
1. Найдите в интернете .gif-файл или загрузите его (например, в ВКонтакте).
2. Скопируйте ссылку на изображение .gif (щелкните правой кнопкой мыши на гифке => "Скопировать URL картинки").
3. Переведите полученную ссылку в QR-код, нажав на иконку расширения. Вставьте ссылку на гифку и нажмите кнопку. QR-код будет скачан.
4. Установите полученный QR-код в качестве обложки профиля и перезагрузите страницу.
   
   Теперь вы можете использовать анимированные обложки во ВКонтакте и видеть анимированные обложки других пользователей, у которых также установлено это расширение и настроен соответствующий QR-код.

## Поддержка в разработке (убедитесь в том, что у вас установлен npm версии 14.0.0 и выше, а также yarn)
1. Клонируйте репозиторий.
2. В корневой папке репозитория выполните команду `yarn && yarn watch`.
3. Откройте Google Chrome и введите `chrome://extensions` в адресной строке.
4. Нажмите кнопку **"Загрузить распакованное расширение"**, затем выберите путь к папке с расширением, включая файл манифеста.

## Известные недоработки
- Google Chrome не позволяет загружать запакованные расширения в формате .crx.
- Версия 3 манифеста не поддерживается в Firefox. Для Firefox требуется отдельная версия расширения с использованием 2 манифеста или откат на 2 версию манифеста.
- Картинки разрешения ниже 960х384 могут не поддерживаться расширением и qr-код не будет сканироваться.
