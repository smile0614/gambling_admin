#!/bin/bash

NEXT_PUBLIC_USER_URL=$(az keyvault secret show --name NEXT-PUBLIC-USER-URL --vault-name $AZURE_KEYVAULT --query value -o tsv)
echo "NEXT_PUBLIC_USER_URL ---> $NEXT_PUBLIC_USER_URL"
NEXT_PUBLIC_API_URL=$(az keyvault secret show --name NEXT-PUBLIC-API-URL --vault-name $AZURE_KEYVAULT --query value -o tsv)
echo "NEXT_PUBLIC_API_URL ---> $NEXT_PUBLIC_API_URL"
NEXT_PUBLIC_AVATAR_URL=$(az keyvault secret show --name NEXT-PUBLIC-AVATAR-URL --vault-name $AZURE_KEYVAULT --query value -o tsv)
echo "NEXT_PUBLIC_AVATAR_URL ---> $NEXT_PUBLIC_AVATAR_URL"
NEXT_PUBLIC_STORAGE_URL=$(az keyvault secret show --name NEXT-PUBLIC-STORAGE-URL --vault-name $AZURE_KEYVAULT --query value -o tsv)
echo "NEXT_PUBLIC_STORAGE_URL ---> $NEXT_PUBLIC_STORAGE_URL"


#################
sed -i "s|<NEXT_PUBLIC_USER_URL>|$NEXT_PUBLIC_USER_URL|g" /app/.env
sed -i "s|<NEXT_PUBLIC_API_URL>|$NEXT_PUBLIC_API_URL|g" /app/.env
sed -i "s|<NEXT_PUBLIC_AVATAR_URL>|$NEXT_PUBLIC_AVATAR_URL|g" /app/.env
sed -i "s|<NEXT_PUBLIC_STORAGE_URL>|$NEXT_PUBLIC_STORAGE_URL|g" /app/.env