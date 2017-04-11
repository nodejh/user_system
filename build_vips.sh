#!/bin/bash
cd client_vips
npm run build
cd ../
cp -rfv client_vips/dist server_vips/static
