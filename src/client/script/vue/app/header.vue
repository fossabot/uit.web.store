<template>
    <row- id="header" 
          :debug="true"
          size="50"
          class="dark">
        <div class="full"/>
        <line-/>
        <row- class="account" 
              size="50">
            <image- :src="avatar(authorize.id)"
                    class="round square"
                    size="30"/>
        </row->
    </row->
</template>
<script>
import { mapState } from 'vuex';
import { avatar } from '../../modules/index';

export default {
    components: {
        ...'col',
        ...'row',
        ...'line',
        ...'image',
        ...'button',
        ...'label',
    },
    computed: {
        ...mapState(['authorize']),
    },
    methods: {
        avatar,
    },
};
</script>
<style lang="scss">
#header {
    z-index: 1;
    > .line {
        margin: 10px 0;
    }
    > .account {
        &:hover {
            background-color: $dark-background-hover;
        }

        > .label {
            padding-right: 0;
            > .text {
                font-size: 17px;
            }
        }
        > .image {
            margin: 10px;
        }
    }
}
</style>
