from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from exceptions.base import NotFoundException
from config.database import get_db
from typing import Any, Generic, Optional, TypeVar

T = TypeVar("T")
TCreate = TypeVar("TCreate")
TUpdate = TypeVar("TUpdate")

class BaseRouter(Generic[T, TCreate, TUpdate]):

    def __init__(
            self,
            crud: Any,
            name: str,
            response_schema: Optional[type[T]],
            create_schema: Optional[type[TCreate]] = None,
            update_schema: Optional[type[TUpdate]] = None,
            disable_create: bool = False,
            disable_get_all: bool = False,
            disable_get_by_id: bool = False,
            disable_update: bool = False,
            disable_delete: bool = False
        ):
            self.router = APIRouter()
            self.crud = crud
            self.name = name
            self.create_schema = create_schema
            self.update_schema = update_schema

            if not disable_create:
                _self = self
                def _create(payload, db: Session = Depends(get_db)):
                    return _self.create(payload, db)
                _create.__annotations__['payload'] = create_schema
                self.router.add_api_route(
                    '',
                    _create,
                    methods=['POST'],
                    response_model=response_schema,
                    status_code=status.HTTP_201_CREATED
                )

            if not disable_get_all:
                self.router.add_api_route(
                    '',
                    self.get_all,
                    methods=['GET'],
                    response_model=list[response_schema],
                    status_code=status.HTTP_200_OK
                )

            if not disable_get_by_id:
                self.router.add_api_route(
                    '/{id}',
                    self.get_by_id,
                    methods=['GET'],
                    response_model=response_schema,
                    status_code=status.HTTP_200_OK
                )

            if not disable_update:
                _self = self
                def _update(payload, id: str, db: Session = Depends(get_db)):
                    return _self.update(payload, id, db)
                _update.__annotations__['payload'] = update_schema
                self.router.add_api_route(
                    "/{id}",
                    _update,
                    methods=['PATCH'],
                    response_model=response_schema,
                    status_code=status.HTTP_200_OK
                )

            if not disable_delete:
                self.router.add_api_route(
                    '/{id}',
                    self.delete,
                    methods=['DELETE'],
                    response_model=None,
                    status_code=status.HTTP_204_NO_CONTENT
                )

    def create(
        self,
        payload: TCreate,
        db: Session = Depends(get_db)
    ) -> T:
        return self.crud.create(db, payload)

    def get_all(
        self,
        skip: int = Query(0, ge=0),
        limit: int = Query(100, ge=1),
        db: Session = Depends(get_db)
    ) -> list[T]:
        return self.crud.get_all(db, skip, limit)
   
    def get(
        self,
        filter: str,
        db: Session = Depends(get_db)
    ) -> T:
        item = self.crud.get(db, filter)

        if item is None:
            raise NotFoundException(resource_name=self.name)

        return item
    
    def get_by_id(
        self,
        id: str,
        db: Session = Depends(get_db)
    ) -> T:
        item = self.crud.get_by_id(db, id)

        if item is None:
            raise NotFoundException(resource_name=self.name)

        return item

    def update(
            self,
            payload: TUpdate,
            id: str,
            db: Session = Depends(get_db),
        ) -> T:
            item = self.crud.get_by_id(db, id)

            if item is None:
                raise NotFoundException(resource_name=self.name)

            return self.crud.update(db, item, payload)

    def delete(
            self,
            id: str,
            db: Session = Depends(get_db),
        ) -> T:
            item = self.crud.delete(db, id)

            if item is None:
                raise NotFoundException(resource_name=self.name)

            return item
