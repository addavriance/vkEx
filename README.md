﻿# VK Covers: Анимированные обложки ВКонтакте
Расширение Гугл, которое позволяет ставить анимированные обложки ВКонтакте, а так же видеть анимированные обложки других пользователей
Для раскодированя QR-кода использует [zxing-js/library](https://github.com/zxing-js/library).

## Установка

- Скачайте файл расширения extension.crx из релизов этого репозитория.
- Откройте в вашем браузере список установленных расширений(например в Яндексе - `browser://tune/`)
- Перетащите скачанный файл в список и установите расширение.
- *Примечание* в Гугл расширение работать не будет, если загрузить его через вышесказанный способ, чтобы установить его в Гугл, прочтите порядок действий в пункте `Поддержка в разработке`

## Использование
- Найдите в интернете .gif файл или загрузите его(например в тот же ВК), скопируйте ссылку картинки.(ПКМ по гифке => Скопировать URL картинки)
- Переведите полученную ссылку в QR-код и поставьте его на обложку ВКонтакте.
- Готово, теперь вы можете ставить анимированные обложки во ВКонтакте и видеть анимированные обложки других пользователей, если у них стоит аналогичный QR-код на обложке.
- Чтобы отключить расширение, нажмите по его иконке и перезагрузите страницу.

## Поддержка в разработке
- Клонируйте репозиторий
- В корневой папке репозитория запустите `yarn && yarn watch`
- Откройте Хром. Зайдите в `chrome://extensions`, Нажмите на кнопку **Загрузить распакованное расширение**, затем выберите путь до папки с расширением, а точнее его manifest файлом.