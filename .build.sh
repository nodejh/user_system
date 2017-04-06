#!/bin/bash
cd client/
npm run build
cd ../
cp -rfv client/dist server/static
