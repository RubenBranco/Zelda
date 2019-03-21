python3 manage.py makemessages \
    --extension html \
    --extension js  \
    --extension py \
    --ignore 'deps/static/admin/*' \
    --ignore 'deps/static/jet/*' \
    --ignore 'deps/static/range_filter/*' \
    -l pt \
    -d django
