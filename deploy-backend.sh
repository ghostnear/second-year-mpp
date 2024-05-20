#!/bin/bash

rsync -zarv  --prune-empty-dirs ./backend/  root@ghnr.xyz:/var/www/mpp/ghnr/xyz/