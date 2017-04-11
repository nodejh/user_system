#!/bin/bash
cd client_teachers
npm run build
cd ../
cp -rfv client_teachers/dist server_teachers/static

cd client_vips
npm run build
cd ../
cp -rfv client_vips/dist server_vips/static
