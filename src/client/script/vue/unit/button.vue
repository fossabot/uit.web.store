<template>
    <row- :class="{ active: active }"
          class="button">
        <span v-if="icon !== ''"
              class="icon">{{ icon }}</span>
        <div v-if="text !== '' && icon === ''"
             class="br" />
        <span v-if="text !== ''"
              class="text">{{ text }}</span>
        <slot/>
        <div v-if="text !== ''"
             class="br" />
    </row->
</template>
<script>
import style, { getAttribute } from 'style';

export default {
    components: {
        ...'row',
    },
    props: {
        active: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
    },

    data() {
        return {};
    },
    updated() {
        const size = getAttribute('size', this, 40, true);
        style({
            [`[size="${size}"] > .button`]: {
                minHeight: `${size}px`,
            },
            [`[size="${size}"] > .button > .br`]: {
                width: `${size * 0.3}px`,
            },
            [`[size="${size}"] > .button > .slot`]: {
                padding: `0 ${size * 0.3}px`,
                fontSize: `#{($size * 0.2 + 7)}px`,
            },
            [`[size="${size}"] > .button > .icon`]: {
                minWidth: `${size}px`,
                minHeight: `${size}px`,
                lineHeight: `${size}px`,
                fontSize: `${size * 0.4}px`,
            },
            [`[size="${size}"] > .button > .text`]: {
                lineHeight: `${size}px`,
                fontSize: `${size * 0.2 + 7}px`,
            },
        });
    },
};
</script>
<style lang="scss">
.button {
    cursor: pointer;
    display: flex;
    position: relative;
    white-space: nowrap;
    > span {
        align-self: center;
        box-sizing: border-box;
        display: block;
        height: 100%;
        margin: 0;
        overflow: hidden;
        &.icon {
            text-align: center;
        }
        &.text {
            text-align: left;
            text-overflow: ellipsis;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            width: auto;
        }
    }
}

.dark .button {
    color: $dark-text-color;
    &:not(.noHover) {
        &:hover,
        &:active,
        &.active,
        &.active:hover {
            @extend %dark-hover;
        }
    }
}

.light .button {
    color: $light-text-color;
    &:not(.noHover) {
        &:hover,
        &:active,
        &.active,
        &.active:hover {
            @extend %light-hover;
        }
    }
}
</style>