#! /usr/bin/env bash

set -e
set -x

alembic upgrade head
python -m script.initial_data
